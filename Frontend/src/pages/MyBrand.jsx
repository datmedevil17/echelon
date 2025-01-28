import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { WalletContext } from "../context/WalletContext";
import { ethers } from "ethers";

const MyBrand = () => {
  const { state, account } = useContext(WalletContext);
  const { contract } = state;
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  // Fetch brand data on component mount
  useEffect(() => {
    const fetchBrandAndProducts = async () => {
      try {
        // Fetch brand details
        const brandData = await contract.brands(account);

        const name = brandData[0];
        const aboutUrl = brandData[1];
        const activeStatus = brandData[3];

        const response = await fetch(aboutUrl);
        const aboutData = await response.json();

        const logoUrl = aboutData.brandLogo;
        const description = aboutData.brandDescription;

        setBrand({ name, logoUrl, description, activeStatus });

        // Fetch products
        const productIds = await contract.getBrandProducts(account);
        const productsList = [];

        for (let productId of productIds) {
          const product = await contract.products(productId);
          productsList.push({
            productId: product.productId.toString(),
            name: product.name,
            price: ethers.formatEther(product.price),
            brandOwner: product.brandOwner,
            minted: product.minted,
          });
        }

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching brand or products:", error);
      }
    };

    fetchBrandAndProducts();
  }, [account, contract]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const priceInWei = ethers.parseEther(price);

      const tx = await contract.addProduct(productName, priceInWei);
      await tx.wait();

      setProductName("");
      setPrice("");
      setIsModalOpen(false);

      // Refresh product list after adding a new product
      const productIds = await contract.getBrandProducts(account);
      const productsList = [];

      for (let productId of productIds) {
        const product = await contract.products(productId);
        productsList.push({
          productId: product.productId.toString(),
          name: product.name,
          price: ethers.formatEther(product.price),
          brandOwner: product.brandOwner,
          minted: product.minted,
        });
      }

      setProducts(productsList);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Brand Dashboard</h1>

        {brand ? (
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="flex items-center">
              <img
                src={brand.logoUrl}
                alt="Brand Logo"
                className="w-24 h-24 rounded-full border-4 border-slate-700"
              />
              <div className="ml-6">
                <h2 className="text-2xl font-semibold">{brand.name}</h2>
                <p className="mt-2 text-slate-400">{brand.description}</p>
                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  {brand.activeStatus ? (
                    <span className="text-green-400">Active</span>
                  ) : (
                    <span className="text-red-400">Inactive</span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Add Product
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Loading brand details...</p>
        )}

        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-slate-800 p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold text-slate-100">
                {product.name}
              </h3>
              <p className="text-slate-400 mt-2">
                <strong>Price:</strong> {product.price} ETH
              </p>
              <p className="text-slate-400">
                <strong>Minted:</strong>{" "}
                {product.minted ? "Yes" : "No"}
              </p>
              <p className="text-slate-400">
                <strong>Owner:</strong>{" "}
                {product.brandOwner.substring(0, 6)}...{product.brandOwner.slice(-4)}
              </p>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-1/3 text-slate-200">
              <h2 className="text-xl font-bold mb-4">Add Product</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-slate-300">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-slate-300">Price (ETH)</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 bg-slate-700 border border-slate-600 rounded"
                    placeholder="Enter price in ETH"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBrand;
