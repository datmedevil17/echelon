import React, { useEffect, useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { ethers } from "ethers";
import Navbar from "./Navbar";

const Collectibles = () => {
  const { state, account } = useContext(WalletContext);
  const { contract } = state;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all NFTs on component mount
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const allNFTs = await contract.getAllNFTs();
        const nftList = allNFTs.map((nft) => ({
          productId: nft.productId.toString(),
          name: nft.name,
          price: ethers.formatEther(nft.price),
          brandOwner: nft.brandOwner,
          minted: nft.minted,
        }));
        setProducts(nftList);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, [contract]);

  const handleBuyNFT = async (productId, price) => {
    setLoading(true);
    try {
      const tx = await contract.buyNFT(productId, {
        value: ethers.parseEther(price),
      });
      await tx.wait();
      alert("Purchase successful!");

      // Refresh the product list after a successful purchase
      const allNFTs = await contract.getAllNFTs();
      const nftList = allNFTs.map((nft) => ({
        productId: nft.productId.toString(),
        name: nft.name,
        price: ethers.formatEther(nft.price),
        brandOwner: nft.brandOwner,
        minted: nft.minted,
      }));
      setProducts(nftList);
    } catch (error) {
      console.error("Error buying NFT:", error);
      alert("Purchase failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
        <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Product Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-slate-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-slate-100 mb-2">
                {product.name}
              </h3>
              <p className="text-slate-400 mb-2">
                <strong>Price:</strong> {product.price} ETH
              </p>
              <p className="text-slate-400 mb-2">
                <strong>Owner:</strong>{" "}
                {product.brandOwner.substring(0, 6)}...{product.brandOwner.slice(-4)}
              </p>
              <p className="text-slate-400 mb-4">
                <strong>Status:</strong>{" "}
                {product.minted ? (
                  <span className="text-green-400">Sold</span>
                ) : (
                  <span className="text-red-400">Available</span>
                )}
              </p>
              {!product.minted && (
                <button
                  onClick={() => handleBuyNFT(product.productId, product.price)}
                  disabled={loading}
                  className={`w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Processing..." : "Buy"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collectibles;
