import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import { ethers } from "ethers";
import { WalletContext } from "../context/WalletContext";
import axios from "axios";

const Launchpad = () => {
  const { state } = useContext(WalletContext);
  const { contract } = state;

  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [brandLogo, setBrandLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadToIPFS = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `35cb1bf7be19d2a8fa0d`,
            pinata_secret_api_key: `2c2e9e43bca7a619154cb48e8b060c5643ea6220d0b7c9deb565fa491b3b3a50`,
            "Content-Type": "multipart/form-data",
          },
        });
        const resData = res.data;
        setBrandLogo(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = JSON.stringify({ brandDescription, brandLogo });
      const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `35cb1bf7be19d2a8fa0d`,
          pinata_secret_api_key: `2c2e9e43bca7a619154cb48e8b060c5643ea6220d0b7c9deb565fa491b3b3a50`,
          "Content-Type": "application/json",
        },
      });
      const resData = res.data;
      const tx = await contract.registerBrand(brandName, `https://ipfs.io/ipfs/${resData.IpfsHash}`);
      await tx.wait();
      alert("Brand registered successfully!");
      setBrandName("");
      setBrandDescription("");
      setBrandLogo(null);
    } catch (error) {
      console.error("Error submitting brand:", error);
      alert("Failed to register the brand. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Launch Your Brand</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-slate-800 p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="brand-name" className="block text-slate-300 mb-2">
              Brand Name
            </label>
            <input
              type="text"
              id="brand-name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your brand name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="brand-description" className="block text-slate-300 mb-2">
              Brand Description
            </label>
            <textarea
              id="brand-description"
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              rows="4"
              required
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your brand"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="brand-logo" className="block text-slate-300 mb-2">
              Brand Logo
            </label>
            <input
              type="file"
              id="brand-logo"
              accept="image/*"
              onChange={uploadToIPFS}
              required
              className="block w-full text-slate-300 border border-slate-600 rounded bg-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            {brandLogo && (
              <img
                src={brandLogo}
                alt="Uploaded Logo"
                className="mt-4 w-24 h-24 rounded-full border-2 border-slate-600"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 text-white rounded-lg ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Launchpad;
