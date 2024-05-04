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
    const etherAmount = ethers.parseEther("1.0");

    beforeEach(async function () {
        [owner, customer_regis, customer_unregis] = await ethers.getSigners();

        energyTradingFactory = (await ethers.getContractFactory(
            "EnergyTrading"
        )) as EnergyTrading__factory;

        // Deploy smart contract
        energyTrading = await energyTradingFactory
            .connect(owner)
            .deploy(initialSupply, ratePerUnit);
    });

    it("Should revert when unregistered customer attempts to buy tokens", async function () {
        // Purchase tokens by sending Ether to buyToken function
        const buyTokenTx = energyTrading
            .connect(customer_unregis)
            .BuyToken({ value: etherAmount });

        // Expect the transaction to revert with the specific error message
        await expect(buyTokenTx).to.be.revertedWith("Only Registered customer");
    });

    describe("REGISTERED CUSTOMER", function () {
        // Calculate amount of tokens to purchase
        const expectedToken = etherAmount / BigInt(ratePerUnit * 1e9);
        console.log(`Expected Token Received: ${expectedToken}`);

        this.beforeEach(async function () {
            // Register customer
            await energyTrading
                .connect(owner)
                .registerCustomer(
                    await customer_regis.getAddress(),
                    "customer_regis"
                );
        });

        it("BUY TOKEN MORE THAN SUPPLY", async function () {
            try {
                await energyTrading
                    .connect(customer_regis)
                    .BuyToken({ value: etherAmount });
            } catch (error: any) {
                const errorMessage = error.message;
                expect(errorMessage).to.include("ERC20InsufficientBalance");
            }
        });

        it("Buytoken Success", async function () {
            const goodAmount = ethers.parseUnits("100", "gwei").valueOf();
            const beforeToken = await energyTrading.balanceOf(customer_regis);

            await energyTrading
                .connect(customer_regis)
                .BuyToken({ value: goodAmount });

            const updateToken = await energyTrading.balanceOf(customer_regis);
            const tokenIncrease =  updateToken.valueOf() - beforeToken.valueOf();
            const expectedToken =
                goodAmount / ethers.toBigInt(ratePerUnit * 1e9);

            console.log(`Update customer token amount = ${updateToken}`);
            expect(tokenIncrease).to.equal(expectedToken);
        });
    });
});
