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
    let customer_regis: Signer;
    let customer_unregis: Signer;

    const initialSupply = 1000000 as const;
    const ratePerUnit = 4 as const;

    const price = 25 as const;

    beforeEach(async function () {
        [owner, customer_regis, customer_unregis] = await ethers.getSigners();

        energyTradingFactory = (await ethers.getContractFactory(
            "EnergyTrading"
        )) as EnergyTrading__factory;

        // Deploy smart contract
        energyTrading = await energyTradingFactory
            .connect(owner)
            .deploy(initialSupply, ratePerUnit);

        await energyTrading
            .connect(owner)
            .registerCustomer(
                await customer_regis.getAddress(),
                "customer_regis"
            );
    });

    it("Should prevent customer from updateRatePerUnit", async function () {
        try {
            await energyTrading
                .connect(customer_regis)
                .setPrice(customer_regis, price);
            expect.fail("Registration by non-owner should revert");
        } catch (error: any) {
            const errorMessage = error.message;
            expect(errorMessage).to.include("OwnableUnauthorizedAccount");
        }

        let yourcost_customer = await energyTrading.yourCost(customer_regis);
        expect(yourcost_customer).to.equal(0);
    });

    it("Customers Dont Paided Bills", async function () {
        await energyTrading.connect(owner).setPrice(customer_regis, price);

        const setPriceTx = energyTrading
            .connect(owner)
            .setPrice(customer_regis, price);
        await expect(setPriceTx).to.be.revertedWith(
            "Customers Dont Paided Bills"
        );
    });

    it("Should revert when unregistered customer got set price by Owner", async function () {
        const setPriceTx = energyTrading
            .connect(owner)
            .setPrice(customer_unregis, price);

        // Expect the transaction to revert with the specific error message
        await expect(setPriceTx).to.be.revertedWith("Only Registered customer");
        let yourcost_customer = await energyTrading.yourCost(customer_unregis);
        expect(yourcost_customer).to.equal(0);
    });

    it("Should revert when unregistered customer got set price by Owner", async function () {
        await energyTrading.connect(owner).setPrice(customer_regis, price);

        let yourcost_customer = await energyTrading.yourCost(customer_regis);
        expect(yourcost_customer).to.equal(price);
    });
});
