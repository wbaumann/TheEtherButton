var ButtonClickGameContract = artifacts.require("./ButtonClickGameContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ButtonClickGameContract);
};
