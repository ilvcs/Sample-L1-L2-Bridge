// Script for deploying tUSDT token
// Sepolia: tUSDT deployed to: 0xac724b72A18F53cE20F593A1df6C3a832B66d89d
const { ethers } = require("hardhat");

const initialSupply = (90e29).toLocaleString("fullwide", {
	useGrouping: false,
});

async function main() {
	const [deployer] = await ethers.getSigners();

	const tUSDT = await ethers.getContractFactory("tUSDT");
	const tUSDTContract = await tUSDT.connect(deployer).deploy(initialSupply);
	console.log("tUSDT deployed to:", await tUSDTContract.getAddress());
}

main();
