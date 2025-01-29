import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import ConnectWallet from "./pages/ConnectWallet";
import About from "./pages/About";
import Launchpad from "./pages/Launchpad";
import Home from "./pages/Home";
import MyBrand from "./pages/MyBrand";
import Collectibles from "./pages/Collectibles";
import Insight from "./pages/Insight";
import Collections from "./pages/Collections";

function App() {
  return (
    <>


        <Routes>
          <Route path="/" element={<ConnectWallet />} />
          <Route path="/about" element={<About />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myBrand" element={<MyBrand />} />
          <Route path="/collectibles" element={<Collectibles />} />
          <Route path="/insight" element={<Insight />} />
          <Route path="/collections" element={<Collections />} />
        </Routes>

      </>

  );
}

export default App;
