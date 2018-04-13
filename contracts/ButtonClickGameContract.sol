pragma solidity ^0.4.21;

import "./ButtonClickGame.sol";

contract ButtonClickGameContract is ButtonClickGame {

    /**
     * Core constructer, which starts the game contact
     */
    function ButtonClickGameContract() public {
        // The contract creator immediately takes over both Admin and Finance roles
        addRole(msg.sender, ROLE_ADMIN);
        addRole(msg.sender, ROLE_FINANCE);

        minimumFee = 500000000000000; // 0.0005 ETH (hopefully low enough to not deter users, but high enough to avoid bots)
        requiredBlocksElapsedForVictory = 20; // 20 blocks must elapse to win
    }    

    /**
     * @dev Officially starts the game and configures all initial details
     */
    function startGame() external onlyAdmin {
        started = true;
        blockNumberForVictory = block.number + requiredBlocksElapsedForVictory;
    }

    /**
     * @dev A simple function to allow for deposits into this contract. We use this
     * instead of the fallback function to ensure that deposits are intentional 
     */
    function sendDeposit() external payable {
        
    }

}