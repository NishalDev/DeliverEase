// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PaymentGateway {
    address payable public owner; // Change address to address payable
    uint public transactionCount;

    // Event to log transactions
    event PaymentReceived(address indexed from, uint amount, uint transactionId);
    event PaymentWithdrawn(address indexed to, uint amount);

    // Mapping to track payments by transaction ID
    mapping(uint => Payment) public payments;

    // Struct to store payment details
    struct Payment {
        address payer;
        uint amount;
        uint timestamp;
    }

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    // Constructor to set the contract deployer as the owner
    constructor() public {
        owner = address(uint160(msg.sender)); // Explicitly cast msg.sender to address payable
        transactionCount = 0;
    }

    // Function to receive Ether payments
    function pay() public payable {
        require(msg.value > 0, "You must send some Ether.");

        // Increment transaction count
        transactionCount++;

        // Log the payment in the payments mapping
        payments[transactionCount] = Payment(msg.sender, msg.value, block.timestamp);

        // Emit an event for the payment
        emit PaymentReceived(msg.sender, msg.value, transactionCount);
    }

    // Function to allow the owner to withdraw Ether from the contract
    function withdraw(uint amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance in the contract.");

        // Transfer the funds to the owner (cast to address payable)
        owner.transfer(amount);

        // Emit an event for the withdrawal
        emit PaymentWithdrawn(owner, amount);
    }

    // Function to get the contract's balance
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
