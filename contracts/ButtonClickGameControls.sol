pragma solidity ^0.4.21;

import "./ButtonClickRBAC.sol";

/*
 * @title Defines specific controls for game administrators
 */
contract ButtonClickGameControls is ButtonClickRBAC {

    /**
     * Monitors if the game has been started
     */
    bool public started = false;

    /**
     * In order to reduce the likelihood of someone spamming the button click continually with
     * multiple ether addresses, which would effectively prevent the button from ever decrementing, 
     * we have introduced the concept of a minimum fee required to click the button. 
     */
    uint256 public minimumFee;

    /**
     * Defines how many blocks must elapse before the game can be "won"
     *
     * http://solidity.readthedocs.io/en/develop/contracts.html?#visibility-and-getters
     */
    uint256 public requiredBlocksElapsedForVictory;

    /**
     * @dev Access modifier, which restricts a call to happen once the game is started
     */
    modifier isStarted() {
        require(started);
        _;
    }

    /**
     * @dev Changes the required number of blocks for victory. This may ONLY be called by the "admin" role
     */
    function setRequiredBlocksElapsedForVictory(uint256 _requiredBlocksElapsedForVictory) external onlyAdmin {
        requiredBlocksElapsedForVictory = _requiredBlocksElapsedForVictory;
    }
    
    /**
     * @dev Changes the minimum fee. This may ONLY be called by the "finance" role
     */
    function setMinimumFee(uint256 _minimumFee) external onlyFinance {
        minimumFee = _minimumFee;
    }

    /**
     * @dev Withdraws the available balance. This may ONLY be called by the "finance" role
     */
    function withdrawBalance() external onlyFinance {
        msg.sender.transfer(address(this).balance);
    }
    
}