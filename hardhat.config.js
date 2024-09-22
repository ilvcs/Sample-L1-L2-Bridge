require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
	solidity: "0.8.20",

	networks: {
		sepolia: {
			chainId: 11155111,
			url: `${process.env.ETHEREUM_SEPOLIA_JSON_RPC_URL}`,
			accounts: [`0x${process.env.ETHEREUM_SEPOLIA_PRIVATE_KEY}`],
		},
		"linea-sepolia": {
			chainId: 59141,
			url: `${process.env.LENIA_SEPOLIA_JSON_RPC_URL}`,
			accounts: [`0x${process.env.LENIA_SEPOLIA_PRIVATE_KEY}`],
		},
	},
};
