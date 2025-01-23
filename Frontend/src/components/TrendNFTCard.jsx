import React from 'react';

const Card = ({
  chain_id = "N/A",
  closing_timestamp = "N/A",
  collection_name = "N/A",
  contract_address = "N/A",
  deal_score = "N/A",
  estimated_eth_price = "N/A",
  listed_eth_price = "N/A",
  listing_timestamp = "N/A",
  marketplace = "N/A",
  thumbnail_palette = "[]",
  thumbnail_url = "https://via.placeholder.com/300", // Default placeholder image
  token_id = "N/A",
}) => {
  // Parse thumbnail palette into an array
  let paletteColors;
  try {
    paletteColors = JSON.parse(thumbnail_palette);
  } catch (error) {
    paletteColors = [];
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <img
        src={thumbnail_url}
        alt={collection_name}
        className="w-full h-48 object-contain bg-gray-100"
      />
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 truncate">
          {collection_name}
        </h2>
        <p className="text-sm text-gray-500">Token ID: {token_id}</p>

        <div className="mt-3">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Chain ID:</span> {chain_id}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Contract Address:</span> {contract_address}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Marketplace:</span> {marketplace}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Deal Score:</span> {typeof deal_score === "number" ? deal_score.toFixed(2) : deal_score}
          </p>
        </div>

        <div className="mt-3 flex justify-between text-sm text-gray-600">
          <div>
            <p>
              <span className="font-semibold">Listed Price:</span> {listed_eth_price !== "N/A" ? `${listed_eth_price} ETH` : listed_eth_price}
            </p>
            <p>
              <span className="font-semibold">Estimated Price:</span> {estimated_eth_price !== "N/A" ? `${parseFloat(estimated_eth_price).toFixed(4)} ETH` : estimated_eth_price}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Listing:</span> {listing_timestamp !== "N/A" ? new Date(listing_timestamp).toLocaleDateString() : listing_timestamp}
            </p>
            <p>
              <span className="font-semibold">Closing:</span> {closing_timestamp !== "N/A" ? new Date(closing_timestamp).toLocaleDateString() : closing_timestamp}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-sm text-gray-800">Thumbnail Palette:</h3>
          <div className="flex space-x-2 mt-2">
            {paletteColors.length > 0 ? (
              paletteColors.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                ></div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No palette available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
