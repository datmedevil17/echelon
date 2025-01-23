import React, { useState,useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphComponent = () => {
  const [selectedBlockchain, setSelectedBlockchain] = useState("ethereum");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("24h");
  const [data,setDate] = useState({data:[{block_dates:[],traders_trend:[],traders_buyers_trend:[],traders_sellers_trend:[]}]})
  const getresponse = async () => {
    try {
      const response = await axios.get(`https://api.unleashnfts.com/api/v2/nft/market-insights/traders?blockchain=${selectedBlockchain}&time_range=${selectedTimePeriod}`,{
        headers:{
            accept: 'application/json', 'x-api-key': '3e736dba7151eb8de28a065916dc9d70'
        }
      })
      if(response.data.data === null){
        setDate({data:[{block_dates:[],traders_trend:[],traders_buyers_trend:[],traders_sellers_trend:[]}]})
        return
      }
      setDate(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    getresponse()
  },[selectedBlockchain,selectedTimePeriod])
  const handleBlockchainChange = (event) => {
    setSelectedBlockchain(event.target.value);
  };

  const handleTimePeriodChange = (event) => {
    setSelectedTimePeriod(event.target.value);
  };

  // Function to extract the relevant data based on the selected blockchain
  const extractGraphData = (data) => {
    const blockDates = data.block_dates;
    const tradersTrend = data.traders_trend;
    const tradersBuyersTrend = data.traders_buyers_trend;
    const tradersSellersTrend = data.traders_sellers_trend;

    return {
      labels: blockDates,
      datasets: [
        {
          label: "Traders",
          data: tradersTrend,
          borderColor: "rgba(75,192,192,1)",
          fill: false,
        },
        {
          label: "Traders (Buyers)",
          data: tradersBuyersTrend,
          borderColor: "rgba(153,102,255,1)",
          fill: false,
        },
        {
          label: "Traders (Sellers)",
          data: tradersSellersTrend,
          borderColor: "rgba(255,99,132,1)",
          fill: false,
        },
      ],
    };
  };

  // Example blockchain and time period options
  const blockchainOptions = ["ethereum", "polygon", "binance", "avalanche", "solana", "binance", "linea", "bitcoin", "unichain_sepolia", "full"];
  const timePeriodOptions = ["15m","30m","24h", "7d", "30d", "90d", "all"];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="blockchain" className="text-lg">
            Select Blockchain:
          </label>
          <select
            id="blockchain"
            className="p-2 border rounded"
            value={selectedBlockchain}
            onChange={handleBlockchainChange}
          >
            {blockchainOptions.map((blockchain) => (
              <option key={blockchain} value={blockchain}>
                {blockchain.charAt(0).toUpperCase() + blockchain.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="time-period" className="text-lg">
            Select Time Period:
          </label>
          <select
            id="time-period"
            className="p-2 border rounded"
            value={selectedTimePeriod}
            onChange={handleTimePeriodChange}
          >
            {timePeriodOptions.map((timePeriod) => (
              <option key={timePeriod} value={timePeriod}>
                {timePeriod}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="graph-container">
        <Line
          data={extractGraphData(data.data[0])}
          options={{
            responsive: true,
            scales: {
              x: {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                },
              },
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              title: {
                display: true,
                text: `Traders Data - Blockchain: ${selectedBlockchain}, Period: ${selectedTimePeriod}`,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default GraphComponent;
