const { ethers } = require("hardhat");
const abiFile = require("../utils/sepolia_token_bridge.json");
const tUSDTDeployedAddress = "0xac724b72A18F53cE20F593A1df6C3a832B66d89d";
const contractAddress = abiFile.contractAddress;
const abi = abiFile.abi;
const AMOUNT_TO_BRIDGE = "1000000000000000000"; // 1 tUSDT

async function main() {
	const [deployer] = await ethers.getSigners();
	const tUSDT = await ethers.getContractFactory("tUSDT");
	const tUSDTContract = tUSDT.attach(tUSDTDeployedAddress);
	const balance = await tUSDTContract.balanceOf(deployer.address);
	console.log("Balance of deployer:", balance.toString());
	// approve the bridge contract to spend the tUSDT
	const approveTx = await tUSDTContract
		.connect(deployer)
		.approve(contractAddress, balance);
	await approveTx.wait(1);
	console.log("Approval transaction hash:", approveTx.hash);
	const sepoliaBridge = new ethers.Contract(contractAddress, abi, deployer);
	const tx = await sepoliaBridge
		.connect(deployer)
		.bridgeToken(tUSDTDeployedAddress, AMOUNT_TO_BRIDGE, deployer.address);
	tx.wait(1);

	console.log("Transaction hash:", tx.hash);
	console.log(
		"Tokens bridged successfully. You can claim tokens on Linea Sepolia after 20 min.",
	);
}

main();
