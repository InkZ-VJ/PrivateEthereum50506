import { ethers, run, network } from "hardhat";
import fs from "fs";
const ETHERSCAN_API_KEY = fs.readFileSync(".etherscan").toString().trim();

const main = async () => {
    // Get contract Factory
    const EnergyTradingFactory = await ethers.getContractFactory("EnergyTrading");

    // Deploy contract
    console.log("Deploying contract...");
    const EnergyTrading = await EnergyTradingFactory.deploy(1000000,4);
    const contract_address = await EnergyTrading.getAddress();
    console.log("Contract Deployed at Address:", contract_address);

    if (network.config.chainId === 11155111 && ETHERSCAN_API_KEY) {
        await verify(contract_address, []);
    }
}

const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(e);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

