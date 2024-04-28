import { expect } from "chai";
import { ethers } from "hardhat";
import { EnergyTrading, EnergyTrading__factory } from "../typechain-types";
import { Signer } from "ethers";

describe("EnergyTrading", function () {
    let energyTrading: EnergyTrading;
    let energyTradingFactory: EnergyTrading__factory;
    let owner: Signer;
    let customer: Signer;

    const initialSupply = 1000000;
    const ratePerUnit = 4;

    beforeEach(async function () {
        [owner, customer] = await ethers.getSigners();

        energyTradingFactory = (await ethers.getContractFactory(
            "EnergyTrading"
        )) as EnergyTrading__factory;
        energyTrading = await energyTradingFactory
            .connect(owner)
            .deploy(initialSupply, ratePerUnit);
    });

    describe("REGISTER TESTS", function () {
        it("Owner Registration", async function () {
            // Register owner as customer
            await energyTrading
                .connect(owner)
                .registerCustomer(await owner.getAddress(), "owner");
            expect(
                await energyTrading.register(await owner.getAddress())
            ).to.equal(true);
            expect(
                await energyTrading.status(await owner.getAddress())
            ).to.equal(true);

            // Register customer
            await energyTrading
                .connect(owner)
                .registerCustomer(await customer.getAddress(), "customer");
            expect(
                await energyTrading.register(await customer.getAddress())
            ).to.equal(true);
            expect(
                await energyTrading.status(await customer.getAddress())
            ).to.equal(true);
        });

        it("Should prevent customer from registering as customer", async function () {
            const customerAddress = await customer.getAddress();

            // Try to register a customer using the customer signer (should fail)
            try {
                await energyTrading
                    .connect(customer)
                    .registerCustomer(customerAddress, "customer");
                // If the above line doesn't throw an error, fail the test
                expect.fail("Registration by non-owner should revert");
            } catch (error: any) {
                // Check if the error message contains the specific custom error
                const errorMessage = error.message;
                expect(errorMessage).to.include("OwnableUnauthorizedAccount");

                // Extract the unauthorized account address from the error message
                const match = errorMessage.match(
                    /OwnableUnauthorizedAccount\("(.+)"\)/
                );
                if (match) {
                    const unauthorizedAccount = match[1];
                    expect(unauthorizedAccount).to.equal(customerAddress);
                } else {
                    expect.fail("Unexpected error format");
                }
            }

            // Verify that the customer was not registered
            expect(await energyTrading.register(customerAddress)).to.equal(
                false
            );
            expect(await energyTrading.status(customerAddress)).to.equal(false);
        });
    });

    describe("BUYTOKEN TESTS", function() {

    })

    describe("PAYBILL TESTS", function(){

    })

});
