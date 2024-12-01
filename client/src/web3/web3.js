
import Web3 from "web3";

let web3;

// Check if the browser is Ethereum enabled (i.e., MetaMask or other providers)
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable().catch((err) => {
    console.error("User denied account access", err);
  });
} else if (window.web3) {
  // Legacy Dapp browsers...
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.error("Non-Ethereum browser detected. Please install MetaMask!");
}

export default web3;
