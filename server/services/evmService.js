const { ethers } = require('ethers');
const fs = require('fs');

let contract;

const init = () => {
  try {
    const address = process.env.EVM_CONTRACT_ADDRESS;
    if (!address || !process.env.EVM_RPC_URL || !process.env.EVM_PRIVATE_KEY) {
      return;
    }
    const provider = new ethers.JsonRpcProvider(process.env.EVM_RPC_URL);
    const wallet = new ethers.Wallet(process.env.EVM_PRIVATE_KEY, provider);
    const abi = [
      'function storeHash(bytes32 hash)',
      'function getHashes(address user) view returns (bytes32[] memory)' ,
      'event HashStored(address indexed user, bytes32 hash, uint256 timestamp)'
    ];
    contract = new ethers.Contract(address, abi, wallet);
  } catch (err) {
    console.error('EVM init failed', err);
  }
};

const storeHash = async (hash) => {
  if (!contract) throw new Error('EVM not configured');
  const tx = await contract.storeHash(hash);
  return tx.hash;
};

init();

module.exports = { storeHash };
