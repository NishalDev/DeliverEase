const Escrow = artifacts.require("Escrow");

module.exports = function (deployer) {
    const arbiterAddress = "0x5b7ae8f7060E98cEa5A87c4Cfbf516213bc410C3"; // replace with actual arbiter address
    const beneficiaryAddress = "0xe3214CBfB152755b13970CB7f14DBd1F3ea43e57"; // replace with actual beneficiary address
    const amount = web3.utils.toWei("1", "ether"); // convert 1 ETH to wei

    deployer.deploy(Escrow, arbiterAddress, beneficiaryAddress, amount);
};
