// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SubmissionRegistry {
    event HashStored(address indexed user, bytes32 hash, uint256 timestamp);

    mapping(address => bytes32[]) private _hashes;

    function storeHash(bytes32 hash) external {
        _hashes[msg.sender].push(hash);
        emit HashStored(msg.sender, hash, block.timestamp);
    }

    function getHashes(address user) external view returns (bytes32[] memory) {
        return _hashes[user];
    }
}
