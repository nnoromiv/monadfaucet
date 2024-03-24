// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./xMonad.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract xFaucet is Ownable {
    xMonad public existingTokenContract;
    uint256 private requestCooldown = 15 minutes;
    mapping(address => uint256) private lastRequestTimestamp;
    mapping(address => uint256) private _balances;

    constructor(address _existingTokenAddress) Ownable(msg.sender) {
        existingTokenContract = xMonad(_existingTokenAddress);
        _balances[msg.sender] = existingTokenContract.balanceOf(msg.sender);
    }

    function requestTokens() external {
        require(block.timestamp - lastRequestTimestamp[msg.sender] >= requestCooldown, "Cooldown period not elapsed");

        uint256 amount = 5 * 10**18; // 5 tokens

        require(existingTokenContract.balanceOf(address(this)) >= amount, "Faucet balance too low");

        lastRequestTimestamp[msg.sender] = block.timestamp;

        existingTokenContract.transfer(msg.sender, amount);
    }

    function setCooldownForAddress(address user, uint256 cooldown) external onlyOwner {
        lastRequestTimestamp[user] = block.timestamp - cooldown;
    }

    function getCooldownForAddress(address user) public view returns (uint256) {
        uint256 timeLeft = lastRequestTimestamp[user] + requestCooldown - block.timestamp;
        return (timeLeft > 0) ? timeLeft : 0;
    }

    // Fallback function to reject any ETH sent to the contract
    receive() external payable {
        revert("xFaucet: Ether not accepted");
    }
}
