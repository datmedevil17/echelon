const  {buildModule}  = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MarketPlace", (m) => {
  const MarketPlace = m.contract("MarketPlace");
  return {
    MarketPlace,
  };
});
