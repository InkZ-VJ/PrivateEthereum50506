import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";

const fs = require("fs");
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
const ETHERSCAN_API_KEY = fs.readFileSync(".etherscan").toString().trim() || "";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {

  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: false,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  solidity: "0.8.24",
};

export default config;
