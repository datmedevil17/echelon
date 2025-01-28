import axios from "axios";
import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const MarketplacesByBlockchain = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.unleashnfts.com/api/v2/nft/marketplace/analytics?blockchain=full&time_range=24h&sort_by=name&sort_order=asc&offset=0&limit=40`,
        {
          headers: {
            accept: "application/json",
            "x-api-key": "3e736dba7151eb8de28a065916dc9d70",
          },
        }
      );
      const data = response.data.data;
      setFilteredData(data);
      setSelectedBlockchain(data[0]?.blockchain || null);
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

  if (loading) return <p className="text-center text-xl font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">Error: {error.message}</p>;

  // Group marketplaces by blockchain
  const groupedMarketplaces = filteredData.reduce((acc, marketplace) => {
    acc[marketplace.blockchain] = acc[marketplace.blockchain] || [];
    acc[marketplace.blockchain].push(marketplace);
    return acc;
  }, {});

  // Get data for selected blockchain
  const selectedData = groupedMarketplaces[selectedBlockchain] || [];

  // Prepare data for pie chart and bar chart
  const pieChartData = {
    labels: selectedData.map((marketplace) => marketplace.name),
    datasets: [
      {
        data: selectedData.map((marketplace) => marketplace.sales),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const barChartData = {
    labels: selectedData.map((marketplace) => marketplace.name),
    datasets: [
      {
        label: "Transactions",
        data: selectedData.map((marketplace) => marketplace.transactions),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Transfers",
        data: selectedData.map((marketplace) => marketplace.transfers),
        backgroundColor: "#FFCE56",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">NFT Marketplaces Analytics</h1>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Left Column: Blockchain Names and Marketplaces */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Marketplaces by Blockchain</h2>
            {Object.entries(groupedMarketplaces).map(([blockchain, marketplaces]) => (
              <div key={blockchain} className="mb-6">
                <h3
                  className={`text-lg font-semibold cursor-pointer ${
                    selectedBlockchain === blockchain ? "text-blue-500" : "text-gray-800"
                  }`}
                  onClick={() => setSelectedBlockchain(blockchain)}
                >
                  {blockchain}
                </h3>
                <ul className="mt-2 ml-4 text-gray-600">
                  {marketplaces.map((marketplace) => (
                    <li key={marketplace.id} className="mb-1">
                      {marketplace.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column: Charts */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Sales Distribution</h3>
              <Pie data={pieChartData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Transactions and Transfers</h3>
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacesByBlockchain;
