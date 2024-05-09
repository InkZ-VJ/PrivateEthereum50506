// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EnergyTrading is ERC20, Ownable {
    // declare variable
    uint256 public RatePerUnit;

    address private immutable serviceProvider;

    mapping(address => bool) public status;
    mapping(address => bool) public register;

    mapping(address => uint256) public yourCost;

    // declare event
    event Paybill(address customer, address _provider, uint256 value);
    event Registration(address customer, string name);

    // custom modifier
    modifier onlyRegistered(address user) {
        require(register[user] == true, "Only Registered customer");
        _;
    }

    // construct
    constructor(
        uint256 initialSupply,
        uint256 rateperunit
    ) ERC20("EnergyTrading", "ET") Ownable(msg.sender) {
        require(rateperunit > 0, "RatePerUnit Should Be Positive");
        serviceProvider = msg.sender;
        _mint(msg.sender, initialSupply);
        RatePerUnit = rateperunit;
    }

    // declare function
    function registerCustomer(
        address _customer,
        string calldata name
    ) external onlyOwner {
        require(register[_customer] == false, "Haven't Registered");
        register[_customer] = true;
        status[_customer] = true;

        emit Registration(_customer, name);
    }

    function updateRatePerUnit(uint256 rateperunit) external onlyOwner {
        require(rateperunit > 0, "RatePerUnit Should Be Positive");
        RatePerUnit = rateperunit;
    }

    function BuyToken() external payable onlyRegistered(msg.sender) {
        uint256 amount = msg.value / (RatePerUnit * 1e9); // Calculate amount of tokens to purchase

        // Transfer tokens from serviceProvider to the customer
        _transfer(serviceProvider, msg.sender, amount);

        // Emit an event for the purchase
        emit Transfer(serviceProvider, msg.sender, amount);
    }

    function setPrice(
        address _customer,
        uint256 _cost
    ) external onlyOwner onlyRegistered(_customer) {
       require(status[_customer] == true, "Customers Dont Paided Bills");
        yourCost[_customer] = _cost;
        status[_customer] = false;
    }

    function payBills(address _customer) external onlyRegistered(_customer) onlyRegistered(msg.sender){
        require(status[_customer] == false, "It's not the time to pay the bills");
        require(
            balanceOf(_customer) >= yourCost[_customer],
            "Customer Dont Have Enough Token"
        );

        uint256 cost = yourCost[_customer];
        _transfer(msg.sender, serviceProvider, cost);
        status[_customer] = true;
        delete yourCost[_customer];

        emit Paybill(_customer, serviceProvider, cost);
    }
}
