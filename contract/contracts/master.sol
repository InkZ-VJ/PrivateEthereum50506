// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EnergyTrading is ERC20, Ownable {
    // declare variable
    address private immutable serviceProvider;
    mapping(address => bool) public status;
    mapping(address => uint256) public yourCost;

    // declare event
    event Paybill(address customer, address _provider, uint256 value);

    // construct
    constructor(
        uint256 initialSupply
    ) ERC20("EnergyTrading", "ET") Ownable(msg.sender) {
        serviceProvider = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    // declare function
    function setPrice(address _customer, uint256 _cost) external onlyOwner {
        require(status[_customer] == true);
        yourCost[_customer] = _cost;
        status[_customer] = false;
    }

    function payBills(address _customer) external onlyOwner {
        require(balanceOf(_customer) >= yourCost[_customer]);
        require(status[_customer] = false);

        uint256 cost = yourCost[_customer];
        transfer(msg.sender, cost);
        status[_customer] = true;
        delete yourCost[_customer];

        emit Paybill(_customer, serviceProvider, cost);
    }
}
