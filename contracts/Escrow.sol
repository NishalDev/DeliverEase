contract Escrow {
    address public arbiter;
    address public beneficiary;
    uint public amount;

    constructor(address _arbiter, address _beneficiary, uint _amount) {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        amount = _amount;
    }
}
