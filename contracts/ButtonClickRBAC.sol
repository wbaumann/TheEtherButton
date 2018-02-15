pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/rbac/RBAC.sol';

/*
 * @title Manages administrative roles for specific ethereum addresses
 */
contract ButtonClickRBAC is RBAC {

    string constant ROLE_FINANCE = "finance";

    /**
     * @dev Access modifier, which restricts functions to only the "finance" role
     */
    modifier onlyFinance() {
        checkRole(msg.sender, ROLE_FINANCE);
        _;
    }

}
