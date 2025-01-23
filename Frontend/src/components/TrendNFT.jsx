import React, { useState, useEffect } from 'react';
import Card from './TrendNFTCard';
import axios from 'axios';

const TrendNFT = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://api.unleashnfts.com/api/v2/nft/top_deals',
      params: {
        sort_by: 'deal_score',
        sort_order: 'desc',
        offset: '0',
        limit: '7',
      },
      headers: {
        accept: 'application/json',
        'x-api-key': '3e736dba7151eb8de28a065916dc9d70',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data.data || [];
      // Filter and normalize data
      const filteredData = data.filter((_, index) => index !== 2 && index !== 4);
      setCards(filteredData);
    } catch (err) {
      setError('Failed to load trending NFTs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Trending NFTs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default TrendNFT;
