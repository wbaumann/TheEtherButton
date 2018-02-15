pragma solidity ^0.4.18;

import './ButtonClickRBAC.sol';

/*
 * @title Defines specific controls for game administrators
 */
contract ButtonClickGameControls is ButtonClickRBAC {

    /**
     * Monitors if the game has been started
     */
    bool public started = false;


    /**
     * @dev Access modifier, which restricts a call to happen once the game is started
     */
    modifier isStarted() {
        require(started);
        _;
    }

    /**
     * @dev Withdraws the available balance. This may ONLY be called by the "finance" role
     */
    function withdrawBalance() external onlyFinance {
        msg.sender.transfer(this.balance);
    }
    
}