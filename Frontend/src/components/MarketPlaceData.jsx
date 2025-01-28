import axios from "axios";
import React, { useState, useEffect } from "react";

const MarketplacesByBlockchain = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      // Replace this with your API call
      const response = await axios.get(`https://api.unleashnfts.com/api/v2/nft/marketplace/analytics?blockchain=full&time_range=24h&sort_by=name&sort_order=asc&offset=0&limit=40`,{
        headers:{
            accept: 'application/json', 
            'x-api-key': '3e736dba7151eb8de28a065916dc9d70'
        }
      })
      const data = response.data.data;
        console.log(data);

      // Transform `updated_at` to a JavaScript `Date` object

      setFilteredData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Group data by blockchain


  const defaultImage = "https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2021/04/NFT.jpeg.jpg";

  if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;
    return (
        <div className="container mx-auto p-4">
          {/* Dropdown for selecting time slots */}
    
          {/* Marketplace Cards */}
          {filteredData &&
            Object.entries(
              filteredData.reduce((acc, marketplace) => {
                acc[marketplace.blockchain] =
                  acc[marketplace.blockchain] || [];
                acc[marketplace.blockchain].push(marketplace);
                return acc;
              }, {})
            ).map(([blockchain, marketplaces]) => (
              <div key={blockchain} className="mb-8">
                <h2 className="text-xl font-bold mb-4 capitalize">{blockchain}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketplaces.map((marketplace) => (
                    <div
                      key={marketplace.id}
                      className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
                    >
                      <img
                        src={marketplace.thumbnail_url || defaultImage}
                        alt={marketplace.name}
                        onError={(e) => (e.target.src = defaultImage)}
                        className="w-full h-32 object-contain bg-gray-100 rounded-lg mb-2"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {marketplace.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        Sales: {marketplace.sales}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Transactions: {marketplace.transactions}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Transfers: {marketplace.transfers}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        Updated At:{" "}
                        {new Date(marketplace.updated_at).toLocaleDateString()}
                      </p>
                      <a
                        href={marketplace.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Visit Marketplace
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      );
};

export default MarketplacesByBlockchain;
