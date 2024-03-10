require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { INFURA_SEPOLIA_HTTPS_KEY, METAMASK_ACCOUNT_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: INFURA_SEPOLIA_HTTPS_KEY,
      accounts: [METAMASK_ACCOUNT_PRIVATE_KEY],
    },
  },
};
