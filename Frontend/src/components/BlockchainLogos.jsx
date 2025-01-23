import React, { useState } from "react";

const TechCard = ({ name = "N/A", symbol = "N/A", image_url = "", description = "No description available" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-48 h-64 flex-shrink-0 rounded-lg bg-white shadow-md p-4 mx-4 flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image_url || "https://via.placeholder.com/150"}
        alt={name}
        className="w-24 h-24 object-contain rounded-full"
      />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-sm text-gray-500">{symbol}</p>

      {/* Hover Description Box */}
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-95 flex flex-col items-center justify-center p-3 rounded-lg shadow-lg">
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      )}
    </div>
  );
};

const TechCarousel = ({ data }) => {
  return (
    <div className="w-full overflow-hidden py-4 bg-gray-100">
      <div className="flex animate-marquee justify-evenly">
        {data.map((item) => (
          <TechCard key={item.chain_id} {...item} />
        ))}
      </div>
    </div>
  );
};

const data = [
  {
    chain_id: 1,
    description: "Ethereum is the community-run technology powering the cryptocurrency, ether (ETH) and thousands of decentralized applications.",
    id: 1,
    image_url: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002",
    name: "Ethereum",
    symbol: "ETH",
  },
  {
    chain_id: 137,
    description: "Polygon, formerly known as the Matic Network, is a scaling solution that aims to provide multiple tools to improve the speed and reduce the cost and complexities of transactions on blockchain networks.",
    id: 2,
    image_url: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    name: "Polygon",
    symbol: "MATIC",
  },
  {
    chain_id: 56,
    description: "Binance, the largest cryptocurrency exchange, has launched a $1 billion growth fund in support of the Binance Smart Chain blockchain.",
    id: 5,
    image_url: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
    name: "Binance Smart Chain",
    symbol: "BSC",
  },
  {
    chain_id: 43114,
    description: "Avalanche is a platform for creating custom blockchain networks and decentralized applications (dApps).",
    id: 3,
    image_url: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
    name: "Avalanche",
    symbol: "AVAX",
  },
  {
    chain_id: 12,
    description: "Solana is a decentralized blockchain built to enable scalable, user-friendly apps for the world.",
    id: 4,
    image_url: "https://cryptologos.cc/logos/solana-sol-logo.png?v=017",
    name: "Solana",
    symbol: "SOL",
  },
];

const Move = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <TechCarousel data={data} />
    </div>
  );
};

export default Move;
