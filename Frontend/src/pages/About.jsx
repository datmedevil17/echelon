import React from 'react';
import Navbar from './Navbar';
import GraphComponent from '../components/TradersInsight';
import MarketplacesByBlockchain from '../components/MarketPlaceData';

const About = () => {
    return (
        <>
        <Navbar/>
        <MarketplacesByBlockchain/>
        </>
    );
}

export default About;
