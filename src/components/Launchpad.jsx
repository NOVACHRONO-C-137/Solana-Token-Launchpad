import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  createFungible,
  mintV1,
  mplTokenMetadata,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
import axios from "axios";

// IMPORTS
import { SuccessModal } from "./SuccessModal";
import { TokenConfetti } from "./TokenConfetti";
import "./TokenConfetti.css";

export function Launchpad() {
  const wallet = useWallet();

  // --- FORM STATE ---
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [supply, setSupply] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const [uploading, setUploading] = useState(false);
  const [imageStatus, setImageStatus] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mintAddress, setMintAddress] = useState("");
  const [txBlockhash, setTxBlockhash] = useState("");

  const umi = createUmi("https://api.devnet.solana.com").use(
    mplTokenMetadata(),
  );

  if (wallet.connected) {
    umi.use(walletAdapterIdentity(wallet));
  }

  useEffect(() => {
    if (toastMessage) {
      const isPersistent =
        toastMessage.includes("Preparing") ||
        toastMessage.includes("Please sign") ||
        toastMessage.includes("Deploying");

      if (!isPersistent) {
        const timer = setTimeout(() => setToastMessage(""), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [toastMessage]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setUploading(true);
    setImageStatus("Uploading Image to IPFS...");

    const formData = new FormData();
    formData.append("file", file);
    const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;
    const pinataSecretApiKey = import.meta.env.VITE_PINATA_SECRET_KEY;

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        },
      );
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      setImageUrl(ipfsUrl);
      setPreviewUrl(ipfsUrl);
      setImageStatus("Upload Successful!!");
    } catch (error) {
      console.error("Upload Error:", error);
      setImageStatus("Upload Failed!!");
      setToastMessage("Image upload failed!!");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setSymbol("");
    setImageUrl("");
    setPreviewUrl("");
    setSupply("");
    setImageStatus("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  async function createToken() {
    if (!wallet.connected) {
      setToastMessage("Please connect wallet!!");
      return;
    }

    if (supply === "" || Number(supply) <= 0) {
      setToastMessage("Supply must be positive!!");
      return;
    }
    if (!name) {
      setToastMessage("Please enter Token Name!");
      return;
    }
    if (!symbol) {
      setToastMessage("Please enter a Symbol!");
      return;
    }
    if (!imageUrl) {
      setToastMessage("Please upload an Image!!");
      return;
    }

    setIsCreating(true);
    setToastMessage("Preparing Transaction");

    try {
      const mint = generateSigner(umi);
      const tokenAmount = supply ? BigInt(supply) * BigInt(10 ** 9) : BigInt(0);

      let builder = createFungible(umi, {
        mint,
        name: name,
        symbol: symbol,
        uri: imageUrl,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 9,
      });

      if (tokenAmount > 0) {
        builder = builder.add(
          mintV1(umi, {
            mint: mint.publicKey,
            authority: umi.identity,
            amount: tokenAmount,
            tokenOwner: umi.identity.publicKey,
            tokenStandard: TokenStandard.Fungible,
          }),
        );
      }

      const { blockhash, lastValidBlockHeight } =
        await umi.rpc.getLatestBlockhash();
      builder = builder.setBlockhash(blockhash);

      setToastMessage("Please sign transaction");
      const signedTransaction = await builder.buildAndSign(umi);

      setToastMessage("Deploying to Solana Blockchain");
      const signature = await umi.rpc.sendTransaction(signedTransaction);

      await umi.rpc.confirmTransaction(signature, {
        strategy: {
          type: "blockhash",
          blockhash,
          lastValidBlockHeight,
        },
      });

      setMintAddress(mint.publicKey.toString());
      setTxBlockhash(blockhash);
      setToastMessage("Token Created Successfully!!");

      setIsModalOpen(true);
    } catch (error) {
      console.error("Creation Failed:", error);
      setToastMessage("Transaction Failed!!");
    } finally {
      setIsCreating(false);
    }
  }

  const getToastColor = (msg) => {
    if (!msg) return "var(--text-primary)";
    if (msg.includes("Success")) return "#14F195";
    if (
      msg.includes("Please connect") ||
      msg.includes("Supply must be positive") ||
      msg.includes("Please enter") ||
      msg.includes("Please upload")
    )
      return "#c99b05";
    if (msg.includes("Failed") || msg.includes("Error")) return "#FF4D4D";
    return "var(--text-primary)";
  };

  const showSpinner = (msg) => {
    if (!msg) return false;

    if (
      msg.includes("Success") ||
      msg.includes("Failed") ||
      msg.includes("Error") ||
      msg.includes("Please enter") ||
      msg.includes("Please upload") ||
      msg.includes("Supply must be positive") ||
      msg.includes("Please connect")
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="launchpad-wrapper">
      {isModalOpen && <TokenConfetti image={previewUrl} />}

      <h1 className="launchpad-title">Solana Token Launchpad</h1>
      <p className="launchpad-subtitle">
        Deploy Token with Metadata on Blockchain
      </p>

      <div className="form-card">
        <div className="input-group">
          <label>Token Name</label>
          <input
            type="text"
            placeholder="e.g. Solana"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Symbol</label>
          <input
            type="text"
            placeholder="e.g. SOL"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>
        <div className="input-group full-width">
          <label>Token Image</label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading || isCreating}
            />
            <div className="input-with-preview-wrapper">
              <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                readOnly
                className="url-input-field"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="small-image-preview"
                />
              )}
            </div>
            {imageStatus && (
              <p style={{ color: "#14F195", fontSize: "0.8rem", margin: "0" }}>
                {imageStatus}
              </p>
            )}
          </div>
        </div>
        <div className="input-group full-width">
          <label>Initial Supply</label>
          <input
            type="number"
            min="1"
            placeholder="1000000"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
          />
        </div>

        <button
          onClick={createToken}
          className="primary-btn full-width"
          disabled={uploading || isCreating}
        >
          {uploading
            ? "UPLOADING IMAGE..."
            : isCreating
              ? "CREATING..."
              : "CREATE TOKEN"}
        </button>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mintAddress={mintAddress}
        name={name}
        symbol={symbol}
        image={previewUrl}
        supply={supply}
        blockhash={txBlockhash}
      />

      {toastMessage && (
        <div
          className="glass-toast"
          style={{ color: getToastColor(toastMessage) }}
        >
          {showSpinner(toastMessage) && <div className="toast-spinner"></div>}
          {toastMessage}
        </div>
      )}
    </div>
  );
}
