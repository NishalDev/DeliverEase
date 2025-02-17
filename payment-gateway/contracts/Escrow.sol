// SPDX-License-Identifier: MIT
pragma solidity ^0.5.1;

contract Escrow {
    address payable public buyer;   // Buyer address
    address payable public seller;  // Seller address
    address payable public arbiter; // Arbiter address (neutral party)
    uint256 public amount;          // Escrowed amount
    bool public isCompleted;        // Tracks whether the transaction is completed

    // Events for transparency
    event Deposited(address indexed buyer, uint256 amount);
    event FundsReleased(address indexed seller, uint256 amount);
    event FundsRefunded(address indexed buyer, uint256 amount);

    // Constructor: Initialize the seller and arbiter
    constructor(address payable _seller, address payable _arbiter) public {
        require(_seller != address(0), "Invalid seller address");
        require(_arbiter != address(0), "Invalid arbiter address");

        buyer = msg.sender; // Set buyer as the contract deployer
        seller = _seller;
        arbiter = _arbiter;
        isCompleted = false;
    }

    // Deposit funds into escrow
    function deposit() public payable {
        require(msg.sender == buyer, "Only the buyer can deposit funds");
        require(amount == 0, "Funds already deposited");
        require(msg.value > 0, "Deposit must be greater than 0");

        amount = msg.value;

        emit Deposited(buyer, amount); // Emit deposit event
    }

    // Release funds to the seller
    function releaseFundsToSeller() public {
        require(msg.sender == buyer || msg.sender == arbiter, "Not authorized to release funds");
        require(!isCompleted, "Transaction already completed");

        isCompleted = true; // Mark transaction as completed before transferring funds

        (bool success, ) = seller.call.value(amount)("");
        require(success, "Transfer to seller failed");

        emit FundsReleased(seller, amount); // Emit funds released event
    }

    // Refund funds to the buyer
    function refundFundsToBuyer() public {
        require(msg.sender == arbiter, "Only the arbiter can refund");
        require(!isCompleted, "Transaction already completed");

        isCompleted = true; // Mark transaction as completed before transferring funds

        (bool success, ) = buyer.call.value(amount)("");
        require(success, "Refund to buyer failed");

        emit FundsRefunded(buyer, amount); // Emit refund event
    }

    // Check contract balance
    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
