import Web3 from "web3";
import Escrow from "../contracts/Escrow.json";
let web3;
let contract;

// Initialize Web3 and the contract
export const initWeb3 = () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable().catch((err) => {
      console.log("User denied access to the wallet");
    });
  } else {
    alert("Please install MetaMask to interact with this site!");
  }
};

export const getContract = async () => {
  if (!contract) {
    const networkId = await web3.eth.net.getId();
    console.log("Network ID:", networkId);

    const deployedNetwork = Escrow.networks[networkId];
    console.log("Deployed Network:", deployedNetwork);

    if (!deployedNetwork) {
      throw new Error("Contract not deployed to the detected network");
    }

    contract = new web3.eth.Contract(Escrow.abi, deployedNetwork.address);
    console.log("Contract Instance:", contract);
  }
  return contract;
};

// Get the current account
export const getAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

// Deposit funds into escrow
// Function to convert INR to ETH (dummy rate, use a real API for live rate)
const inrToEthRate = 0.00002; // Example rate (1 INR = 0.000011 ETH)
export const deposit = async (amountInInr, account) => {
  const amountInEth = amountInInr * inrToEthRate; // Convert INR to ETH

  const contractInstance = await getContract();
  const response = await contractInstance.methods.deposit().send({
    from: account,
    value: web3.utils.toWei(amountInEth.toString(), "ether"), // Convert ETH to Wei
    gas: 3000000,
  });
  return response;
};
