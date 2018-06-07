# TheEtherButton

> An [Ethereum](https://www.ethereum.org/)-based version of Reddit's [r/TheButton](https://www.reddit.com/r/thebutton/) game. The button counts down from 20 blocks. You will be awarded an [ERC-721](http://erc721.org/) token flair when you click the button, but you may only do so once. And the block counter will reset to 20 as soon as you do. Choose wisely...

## Overview

[The Button was an online meta-game and social experiment that featured an online button and 60 second countdown timer that would reset each time the button was pressed](https://en.wikipedia.org/wiki/The_Button_(Reddit)). We thought it would be fun to create the same concept but on the Ethereum blockchain.

You can find a quick project overview on [State of the DApps](https://www.stateofthedapps.com/dapps/the-ether-button) as well.

## Install

This project requires both [npm](https://www.npmjs.com/) and [truffle](https://github.com/trufflesuite/truffle). Once you have the former, you can install the latter via:

```bash
npm install -g truffle
```

## Deployment

Next, you'll need to launch truffle:

```bash
truffle develop
```

To compile and deploy the Smart Contract:

```bash
$ truffle(develop)> compile
$ truffle(develop)> migrate

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0xa259863eefa1dbe68d2d5ff04aa6a78081512e3f6d60b7b0725668562bdf3e1d
  Migrations: 0xecfcab0a285d3380e488a39b4bb21e777f8a4eac
Saving successful migration to network...
  ... 0x64df98e7d3f1cf5dc7eaa5264011714bf49802d9fda56003e202434903c2581b
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing ButtonClickGameContract...
  ... 0x206e0085aa3ca351cce3cefef135cfaa5bf17c422c7c5281c67c203d2c3c9559
  ButtonClickGameContract: 0x4e72770760c011647d4873f60a3cf6cdea896cd8
Saving successful migration to network...
  ... 0x2613896914f5d1eeaed6be42e3e0466d891206e27c197a7bac0078225f4d693a
Saving artifacts...
```

Please note that if you are seeing an error like:

```bash
Attempting to run transaction which calls a contract function, but recipient address 0xabcdef.... is not a contract address
```

Be sure to add the `--reset` flag to the `migrate` command like:

```bash
truffle(develop)> migrate --reset
```

One the migration completes, you'll like see an output similar to what is shown above. Be sure to note the address to which the contract deployed (`0x4e72770760c011647d4873f60a3cf6cdea896cd8` in the example above). To simplify future interactions with this address, we recommend saving this as a local variable:

```bash
truffle(develop)> address = "0x4e72770760c011647d4873f60a3cf6cdea896cd8"
```

Once complete, you can start `npm` as usual to test your development work:

```bash
npm run start
```

### Deployment to the BlockChain

Prior to deployment, it is recommended that you flatten all source files into a single one with [truffle-flattener](https://github.com/alcuadrado/truffle-flattener).

```bash
truffle-flattener ButtonClickGameContract.sol >> FlattenedContract.sol
```

Once complete, you can upload your flattened contract to [Remix](https://remix.ethereum.org/), a web based IDE. Using a combination of MetaMask and the deploy functionality on this page, you should be able to deploy the contract fairly easily.

*Note: I found Remix to be far easier and more consistent to use that Truffle, which may merely be due to deployment misconfigurations on my end.*

## Starting the Game

Once the game has been deployed, you can start it via the Truffle contract via the following command by replacing the sample address with the contract one:

```bash
truffle(develop)> ButtonClickGameContract.at(address).startGame()
```

Button clicks can be initiated via the following command:

```bash
truffle(develop)> ButtonClickGameContract.at(address).clickButton({value: 500000000000000})
```

Finally if you are on a local test network, you can simulate mined blocks by running the following command:

```bash
truffle(develop)> web3.currentProvider.sendAsync({jsonrpc: "2.0", method: "evm_mine", id: 12345}, () => {})
```

## EtherScan

The game's contract is available on Etherscan:

* Ropsten: [0x945687adcc12b818c46f4dc6834712ed40345093](https://ropsten.etherscan.io/address/0x945687adcc12b818c46f4dc6834712ed40345093)
* MainNet: [0xdeafc8d49ea6d6044eaa53f5e7c7c35c60e13d7f](https://etherscan.io/address/0xdeafc8d49ea6d6044eaa53f5e7c7c35c60e13d7f)

Using the same flattened contract as before, we can upload the source to our Etherscan page:

* [Etherscan Contract Verification](https://etherscan.io/verifyContract?a=0x1326a7cf4f7366a4f5308f5e53dea238b72fd3b9)

Please note that the contract name in the verification must be `ButtonClickGameContract` in order to match our deployment.

## Web Deployment

For convenience, we use GitHub Pages as our hosting for this site. Deployments can be done via the [gh-pages](https://github.com/tschaub/gh-pages) tool, which is included in our `package.json` file. Deployments can be run as follows:

```bash
npm run deploy
```

## Donate

If you like this project, please consider donating:

* **BTC:** [3MGikseSB69cGjUkJs4Cqg93s5s8tv38tK](bitcoin:3MGikseSB69cGjUkJs4Cqg93s5s8tv38tK)
* **ETH:** [0xd5F9Da6a4F9c93B12588D89c7F702a0f7d92303D](https://etherscan.io/address/0xd5F9Da6a4F9c93B12588D89c7F702a0f7d92303D)

## License

```
MIT License

Copyright (c) 2018 Will Baumann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
