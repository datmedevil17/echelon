import React, { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { connectWallet, account } = useContext(WalletContext);

  const tabs = [
    { name: "Home", path: "/home" },
    { name: "Launchpad", path: "/launchpad" },
    { name: "MyBrand", path: "/myBrand" },
    { name: "Collectibles", path: "/collectibles" },
    { name: "Collections", path: "/collections" },
    { name: "Insights", path: "/insight" },
  ];

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left - Logo */}
      <div className="text-2xl font-bold cursor-pointer">Echelon</div>

      {/* Center - Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-gray-700">
        {tabs.map((tab) => (
          <li key={tab.name} className="relative transition-all duration-300">
            <Link
              to={tab.path}
              className={`cursor-pointer ${
                activeTab === tab.name ? "text-black font-semibold" : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </Link>
            {activeTab === tab.name && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-orange-500 transition-all duration-300"></span>
            )}
          </li>
        ))}
      </ul>

      {/* Right - Connect Wallet Button or Address */}
      {account ? (
        <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      ) : (
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
          {tabs.map((tab) => (
            <li key={tab.name} className="cursor-pointer">
              <Link
                to={tab.path}
                className={`${
                  activeTab === tab.name ? "text-black font-semibold" : "text-gray-700"
                }`}
                onClick={() => {
                  setActiveTab(tab.name);
                  setMenuOpen(false);
                }}
              >
                {tab.name}
              </Link>
            </li>
          ))}
          {/* Show Wallet Address or Connect Button */}
          {account ? (
            <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          ) : (
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
