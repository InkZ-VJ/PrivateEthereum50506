// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract EnergyTrading {
    mapping (address => uint256) public balanceOf;
    mapping (address => uint256) public yourCost;
    mapping (address => bool) public status; 
    mapping (address => PaymentDetail) public transaction;
    address private serviceProvider;
    struct PaymentDetail {
        address customer;
        address ownerE;
        uint value;
    } 

    constructor(uint256 maxToken) {
        balanceOf[msg.sender] = maxToken;
        serviceProvider = msg.sender;
    }

    function mintToken (uint _amount) public {
        require(msg.sender == serviceProvider);
        balanceOf[msg.sender] += _amount;
    }

    function setPrice(address _customer,uint _cost ) public {
        require(msg.sender == serviceProvider);
        yourCost[_customer] = _cost;
        status[_customer] = false;
    }
 
    function BuyToken(uint256 _value) public {
        balanceOf[serviceProvider] -= _value;
        balanceOf[msg.sender] += _value;
    }
    function payBills(address _customerAddress) public {
        require (msg.sender == _customerAddress);
        require (balanceOf[_customerAddress] >= yourCost[_customerAddress]);
        balanceOf[_customerAddress] -= yourCost[_customerAddress];
        balanceOf[serviceProvider] += yourCost[_customerAddress];
        status[_customerAddress] = true;
        PaymentDetail storage point = transaction[_customerAddress];
        point.customer = _customerAddress;
        point.ownerE = serviceProvider;
        point.value = yourCost[_customerAddress];
        yourCost[_customerAddress] = 0;
    }
}
