import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { EnergyTrading, EnergyTrading__factory } from "../typechain-types";

describe("EnergyTrading", function(){
    let energyTrading: EnergyTrading;
    let energyTradingFactory : EnergyTrading__factory;

    this.beforeAll(async () => {
        energyTradingFactory = (await ethers.getContractFactory("EnergyTrading")) as EnergyTrading__factory;
        energyTrading = await energyTradingFactory.deploy(1000000);
    });

    
})

