import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router';
// import Home from './pages/Home';
import ConnectWallet from './pages/ConnectWallet';
import About from './pages/About';
import Launchpad from './pages/Launchpad';
import Home from './pages/Home';
import MyBrand from './pages/MyBrand';
import Collectibles from './pages/Collectibles';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ConnectWallet/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/launchpad" element={<Launchpad/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/myBrand" element={<MyBrand/>}></Route>
        <Route path="/collectibles" element={<Collectibles/>}></Route>

      </Routes>
    </>
  );
}

export default App;
