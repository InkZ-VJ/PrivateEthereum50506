import { expect } from "chai";
import { ethers } from "hardhat";
import { EnergyTrading, EnergyTrading__factory } from "../typechain-types";
import { Signer } from "ethers";

describe("BUYTOKEN TESTS", function () {
    // smart contract
    let energyTrading: EnergyTrading;
    let energyTradingFactory: EnergyTrading__factory;
    // player
    let owner: Signer;
    let customer_regis: Signer;
    let customer_unregis: Signer;

    const initialSupply = 1000000;
    const ratePerUnit = 4;

    // Calculate amount of tokens to purchase
    const etherAmount = ethers.parseEther("1.0"); // 1 Ether

    beforeEach(async function () {
        [owner, customer_regis, customer_unregis] = await ethers.getSigners();

        energyTradingFactory = (await ethers.getContractFactory(
            "EnergyTrading"
        )) as EnergyTrading__factory;

        // Deploy smart contract
        energyTrading = await energyTradingFactory
            .connect(owner)
            .deploy(initialSupply, ratePerUnit);

        // Register customer
        await energyTrading
            .connect(owner)
            .registerCustomer(
                await customer_regis.getAddress(),
                "customer_regis"
            );
    });

    it("Should revert when unregistered customer attempts to buy tokens", async function () {
        // Purchase tokens by sending Ether to buyToken function
        const buyTokenTx = energyTrading
            .connect(customer_unregis)
            .BuyToken({ value: etherAmount });

        // Expect the transaction to revert with the specific error message
        await expect(buyTokenTx).to.be.revertedWith("Only Registered customer");
    });

    it("Buytoken Success", async function () {
        // Purchase tokens by sending Ether to buyToken function
        await energyTrading
            .connect(customer_regis)
            .BuyToken({ value: etherAmount });
    });
});
