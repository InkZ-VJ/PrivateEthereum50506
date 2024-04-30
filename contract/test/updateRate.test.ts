import { expect } from "chai";
import { ethers } from "hardhat";
import { EnergyTrading, EnergyTrading__factory } from "../typechain-types";
import { Signer } from "ethers";

describe("UPDATE RATEPERUNIT TEST", function () {
    // smart contract
    let energyTrading: EnergyTrading;
    let energyTradingFactory: EnergyTrading__factory;
    // player
    let owner: Signer;
    let customer: Signer;

    const initialSupply = 1000000;
    const beforeRatePerUnit = 4;
    const afterRatePerUnit = 1;

    beforeEach(async function () {
        [owner, customer] = await ethers.getSigners();

        energyTradingFactory = (await ethers.getContractFactory(
            "EnergyTrading"
        )) as EnergyTrading__factory;

        // Deploy smart contract
        energyTrading = await energyTradingFactory
            .connect(owner)
            .deploy(initialSupply, beforeRatePerUnit);
    });

    it("HAPPY CASE", async function () {
        // update rate per unit
        await energyTrading.connect(owner).updateRatePerUnit(afterRatePerUnit);

        // check rate per unit
        const updateRatePerUnit = await energyTrading.RatePerUnit();
        expect(updateRatePerUnit).to.equal(afterRatePerUnit);
    });

    it("Should prevent customer from updateRatePerUnit", async function () {
        // update rate per unit

        try {
            await energyTrading
                .connect(customer)
                .updateRatePerUnit(afterRatePerUnit);
            expect.fail("Registration by non-owner should revert");
        } catch (error: any) {
            const errorMessage = error.message;
            expect(errorMessage).to.include("OwnableUnauthorizedAccount");
        }

        // check rate per unit
        const updateRatePerUnit = await energyTrading.RatePerUnit();
        expect(updateRatePerUnit).to.equal(beforeRatePerUnit);
    });
});
