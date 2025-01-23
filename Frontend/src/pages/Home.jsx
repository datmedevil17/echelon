import React from "react";
import Move from "../components/BlockchainLogos";
import TrendNFT from "../components/TrendNFT";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="bg-gray-50">
        <Navbar/>
      {/* 🚀 Hero Section */}
      <header className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          The Ultimate NFT Brand Launchpad
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
          Discover, Launch, and Explore Exclusive NFT Brands with Blockchain-Powered Authenticity.
        </p>
        <div className="mt-6 flex space-x-4">
          <a href="/explore" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition">
            Explore NFTs
          </a>
          <a href="/launch" className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition">
            Launch Your Brand
          </a>
        </div>
      </header>

      {/* 📈 Trending NFTs & Blockchain Logos */}
      <TrendNFT />
      <Move />

      {/* 🌍 Footer Section */}
      <footer className="bg-gray-900 text-white py-10 mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">NFT Brand Launchpad</h2>
            <p className="text-gray-400 mt-2">The future of NFT brand creation and discovery.</p>
          </div>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-blue-400 transition">About</a>
            <a href="#" className="hover:text-blue-400 transition">Marketplace</a>
            <a href="#" className="hover:text-blue-400 transition">Contact</a>
          </div>
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-discord text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">
          &copy; {new Date().getFullYear()} NFT Brand Launchpad. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
