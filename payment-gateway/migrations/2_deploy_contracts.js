const Escrow = artifacts.require("Escrow");

module.exports = async function(deployer, network, accounts) {
  const buyer = accounts[1]; // Change to the actual buyer address
  const seller = accounts[2]; // Change to the actual seller address

  // Deploy the contract with the correct number of parameters
  await deployer.deploy(Escrow, buyer, seller);
};
