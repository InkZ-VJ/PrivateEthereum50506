import { expect } from "chai";
import { ethers } from "hardhat";
import { EnergyTrading, EnergyTrading__factory } from "../typechain-types";
import { Signer } from "ethers";

describe("SETPRICE TESTS", function () {
    // smart contract
    let energyTrading: EnergyTrading;
    let energyTradingFactory: EnergyTrading__factory;
    // player
    let owner: Signer;
    let customer_debt: Signer;
    let customer_non_debt: Signer;
    let customer_unregis: Signer;

    const initialSupply = 1000000 as const;
    const ratePerUnit = 4 as const;
    const price = 30 as const;
    const amountCoin = ethers.parseUnits("100", "gwei").valueOf();

    beforeEach(async function () {
        [owner, customer_debt, customer_non_debt, customer_unregis] =
            await ethers.getSigners();

        energyTradingFactory = (await ethers.getContractFactory(
            "EnergyTrading"
        )) as EnergyTrading__factory;

        // Deploy smart contract
        energyTrading = await energyTradingFactory
            .connect(owner)
            .deploy(initialSupply, ratePerUnit);

        // Setup customer who in dept of Energy Bills
        await energyTrading
            .connect(owner)
            .registerCustomer(customer_debt, "registered customer");
        await energyTrading.connect(owner).setPrice(customer_debt, price);
        expect(await energyTrading.register(await customer_debt.getAddress()))
            .to.be.true;
        expect(await energyTrading.status(await customer_debt.getAddress())).to
            .be.false;

        // Setup customer who in non-dept of Energy Bills
        await energyTrading
            .connect(owner)
            .registerCustomer(customer_non_debt, "registered customer");
        expect(
            await energyTrading.register(await customer_non_debt.getAddress())
        ).to.be.true;
        expect(await energyTrading.status(await customer_non_debt.getAddress()))
            .to.be.true;

        // Test unregistered customer
        expect(await energyTrading.status(await customer_unregis.getAddress()))
            .to.be.false;
    });

    describe("AUTHORIZE PAYBILLS TESTING", function () {
        it("Should revert when unregistered customer attempts to pay bills for other custmer", async function () {
            // Purchase tokens by sending Ether to buyToken function
            const payBillTx = energyTrading
                .connect(customer_unregis)
                .payBills(customer_debt);

            // Expect the transaction to revert with the specific error message
            await expect(payBillTx).to.be.revertedWith(
                "Only Registered customer"
            );
        });

        it("Should revert when unregistered customer attempts to pay bills", async function () {
            // Purchase tokens by sending Ether to buyToken function
            const payBillTx = energyTrading
                .connect(customer_unregis)
                .payBills(customer_unregis);

            // Expect the transaction to revert with the specific error message
            await expect(payBillTx).to.be.revertedWith(
                "Only Registered customer"
            );
        });

        it("Should revert when registered customer attempts to pay bills for unregistered custmer", async function () {
            // Purchase tokens by sending Ether to buyToken function
            const payBillTx = energyTrading
                .connect(customer_debt)
                .payBills(customer_unregis);

            // Expect the transaction to revert with the specific error message
            await expect(payBillTx).to.be.revertedWith(
                "Only Registered customer"
            );
        });
    });

    describe("PAYBILLS TESTING", function () {
        this.beforeEach(async function () {
            // buy not enough token to pay bills
            const beforeToken = await energyTrading.balanceOf(customer_debt);
            await energyTrading
                .connect(customer_debt)
                .BuyToken({ value: amountCoin });

            const expectedToken =
                amountCoin / ethers.toBigInt(ratePerUnit * 1e9);

            const updateToken = await energyTrading.balanceOf(customer_debt);
            const tokenIncrease = updateToken.valueOf() - beforeToken.valueOf();
            expect(tokenIncrease).to.equal(expectedToken);
        });
    });
});
