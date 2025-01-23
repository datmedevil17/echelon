import React, { useState, useEffect } from 'react'
import Card from './TrendNFTCard'
import axios from 'axios'
const TrendNFT = () => {
  const [cards, setCards] = useState([{}])
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
  }
  const getdata = async () => {
    try {
      const response = await axios.request(options)
      const data = response.data.data
      const updatedData = data.filter((item,index) => (index!=2 && index!=4))
      setCards(updatedData)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getdata()
  }, [])
  return (
    <div>
      <div className='flex flex-wrap gap-6 justify-center'>
        {cards.map((card, index) => (
          <Card
            key={index}
            {...card}
          />
        ))}
      </div>
    </div>
  )
}

export default TrendNFT
