import React from 'react';

const Card = ({
  closing_timestamp = "N/A",
  collection_name = "N/A",
  deal_score = "N/A",
  estimated_eth_price = "N/A",
  listed_eth_price = "N/A",
  listing_timestamp = "N/A",
  thumbnail_palette = "[]",
  thumbnail_url = "https://via.placeholder.com/300", // Default placeholder image
}) => {
  // Parse thumbnail palette into an array
  let paletteColors;
  try {
    paletteColors = JSON.parse(thumbnail_palette);
  } catch (error) {
    paletteColors = [];
  }

  return (
    <div className="flex max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="w-1/3 bg-gray-100">
        <img
          src={thumbnail_url}
          alt={collection_name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-2/3 p-5">
        <h2 className="text-lg font-bold text-gray-800 truncate">
          {collection_name}
        </h2>

        <div className="mt-3">
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
