import React, { Component } from 'react';
import ButtonClickGameContract from '../build/contracts/ButtonClickGameContract.json';
import getWeb3 from './utils/getWeb3';
import Header from './components/Header/Header';
import Tooltip from './components/Tooltip/Tooltip';
import Hero from './components/Hero/Hero';
import TheButton from './components/TheButton/TheButton';
import Stats from './components/Stats/Stats';
import Clicks from './components/Clicks/Clicks';
import Faq from './components/Faq/Faq';
import Footer from './components/Footer/Footer';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    // TODO: Use a better state management tool instead of just saving everything here as a God object
    this.state = {
      gameGeneration: 0,
      totalSupply: 0,
      web3: null,
      hasWeb3: false,
      accounts: null,
      networkId: -1,
      currentBlockNumber: 0,
      victoryBlockNumer: 20,
      requiredBlocksElapsedForVictory: 20,
      lastErc721Clicks: null,
      myErc721Clicks: null
    }
    
    this.intervalIds = [];
    this.onButtonClickedBinding = this.onButtonClicked.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3.then(results => {
      this.setState({ web3: results.web3, hasWeb3: results.web3 !== null });

      // Instantiate contract once web3 provided.
      if (results.web3) {
        this.instantiateContract(results.web3);
      }
    })
    .catch(e => {
      console.log('Error finding web3. ' + e)
    });
    
  }

  componentWillUnmount() {
    this.intervalIds.forEach(id => {
      console.log('Clearing id: ' + id);
      clearInterval(this.intervalId);
    });
  }

  getAccounts() {
    this.state.web3.eth.getAccounts((error, accounts) => {
      if (!error) {
        this.setState({ accounts: accounts});
      }
    });
  }

  getNetwork() {
    this.state.web3.version.getNetwork((err, netId) => {
      if (!err) {
        try {
          var networkId = parseInt(netId, 10);
          this.setState({networkId: networkId});
        } catch (e) {
          console.log('Failed to query Ethereum Network. ' + e);
        }
      }
    });
  }

  getLatestBlock() {
    this.state.web3.eth.getBlock('latest', (error, result) => {
      if (!error) {
        this.setState({currentBlockNumber: result.number});
      }
    });
  }

  getButtonClickGame() {
    const contract = require('truffle-contract');
    const buttonClickGame = contract(ButtonClickGameContract);
    buttonClickGame.setProvider(this.state.web3.currentProvider);
    return buttonClickGame;
  }

  getLastClicks() {
    let buttonClickGame = this.getButtonClickGame();
    var buttonClickGameInstance; // For access in promise blocks

    this.state.web3.eth.getAccounts((error, accounts) => {
      if (!error && accounts && accounts.length > 0) {
        let account = accounts[0];
        buttonClickGame.deployed().then((instance) => {
          buttonClickGameInstance = instance;
          return instance;
        }).then((instance) => {
          return buttonClickGameInstance.totalSupply.call(account);
        })
        .then((totalSupplyResult) => {
          let totalSupply = totalSupplyResult.c[0];
          this.setState({totalSupply: totalSupply});
          return totalSupply;
        })
        .then((totalSupply) => {
          let tokenIds = [];
          // Get our last 3 clicks
          if (totalSupply >= 3) {
            tokenIds.push(totalSupply - 3);
          }
          if (totalSupply >= 2) {
            tokenIds.push(totalSupply - 2);
          }
          if (totalSupply >= 1) {
            tokenIds.push(totalSupply - 1);
          }
          return this.readTokenMetadataAsPromise(tokenIds, account, buttonClickGameInstance);
        })
        .then((lastErc721Clicks) => {
          return this.setState({lastErc721Clicks: lastErc721Clicks});
        })
        .catch(e => {
          console.log('Failed to retrieve the last erc721 tokens generated. ' + e);
        });
      }
    });
  }

  getTokenOwnership() {
    let buttonClickGame = this.getButtonClickGame();
    var buttonClickGameInstance; // For access in promise blocks

    this.state.web3.eth.getAccounts((error, accounts) => {
      if (!error && accounts && accounts.length > 0) {
        let account = accounts[0];
        buttonClickGame.deployed().then((instance) => {
          buttonClickGameInstance = instance;
          return instance;
        }).then((instance) => {
          return buttonClickGameInstance.balanceOf.call(account, {from: account});
        })
        .then((balanceResult) => {
          return balanceResult.c[0];
        })
        .then((balance) => {
          let promises = [];
          for (var ownedItem = 0; ownedItem < balance; ownedItem++) {
            promises.push(buttonClickGameInstance.tokenOfOwnerByIndex.call(account, ownedItem, {from: account}));
          }
          return Promise.all(promises);
        })
        .then((tokensResults) => {
          let tokens = [];
          tokensResults.forEach(tokenResult => {
            tokens.push(tokenResult.c[0]);
          });
          return tokens;
        })
        .then((tokens) => {
          return this.readTokenMetadataAsPromise(tokens, account, buttonClickGameInstance);
        })
        .then((myErc721Clicks) => {
          return this.setState({myErc721Clicks: myErc721Clicks});
        })
        .catch(e => {
          console.log('Failed to retrieve the last erc721 tokens generated. ' + e);
        });
      }
    });
  }

  readTokenMetadataAsPromise(tokenIds, account, buttonClickGameInstance) {
    let promises = [];
    tokenIds.forEach(tokenId => {
      promises.push(buttonClickGameInstance.getClickMetadata.call(tokenId, {from: account}));
    });
    return Promise.all(promises)
                  .then((clickMetadataArray) => {
                    // Assemble each into an erc721click object
                    let lastErc721Clicks = [];
                    clickMetadataArray.forEach(clickMetadata => {
                      let lastErc721Click = {
                        blocksAwayFromDesiredBlock: clickMetadata[0].c[0],
                        clickTime: clickMetadata[1].c[0],
                        clickGeneration: clickMetadata[2].c[0],
                        owner: clickMetadata[3]
                      };
                      lastErc721Clicks.push(lastErc721Click);
                    });
                    return lastErc721Clicks;
                  });
  }

  getGameGeneration() {
    let buttonClickGame = this.getButtonClickGame();
    var buttonClickGameInstance; // For access in promise blocks
    this.state.web3.eth.getAccounts((error, accounts) => {
      if (!error && accounts && accounts.length > 0) {
        let account = accounts[0];
        buttonClickGame.deployed().then((instance) => {
          buttonClickGameInstance = instance;
          return instance;
        }).then((result) => {
          return buttonClickGameInstance.gameGeneration.call(account);
        }).then((result) => {
          // Update state with the result.
          return this.setState({ gameGeneration: result.c[0] });
        })
        .catch(e => {
          console.log('Failed to fetch the current game generation. ' + e);
        });
      }
    });
  }

  getBlockNumberForVictory() {
    let buttonClickGame = this.getButtonClickGame();
    var buttonClickGameInstance; // For access in promise blocks
    this.state.web3.eth.getAccounts((error, accounts) => {
      if (!error && accounts && accounts.length > 0) {
        let account = accounts[0];
        buttonClickGame.deployed().then((instance) => {
          buttonClickGameInstance = instance;
          return instance;
        }).then((result) => {
          return buttonClickGameInstance.blockNumberForVictory.call(account);
        }).then((result) => {
          // Update state with the result.
          return this.setState({ victoryBlockNumer: result.c[0] });
        })
        .catch(e => {
          console.log('Failed to fetch the block number for victory. ' + e);
        });
      }
    });
  }

  onButtonClicked() {
    let web3 = this.state.web3;
    if (web3) {
      let buttonClickGame = this.getButtonClickGame();
      var buttonClickGameInstance; // For access in promise blocks

      web3.eth.getAccounts((error, accounts) => {
        if (!error && accounts && accounts.length > 0) {
          let account = accounts[0];
          buttonClickGame.deployed().then((instance) => {
            buttonClickGameInstance = instance;
            return instance;
          }).then((result) => {
            return buttonClickGameInstance.clickButton({from: account, value: 500000000000000});
          })
          .then((result) => {
            console.log('Successfully clicked the ether button: ', result);
          })
          .catch(e => {
            console.log('Failed to send this Tx. ' + e);
          });
        }
      });
    }
  }

  instantiateContract(web3) {
    // Define how frequently we check account settings and network state
    const web3RefreshInterval = 500;

    // Monitor account changes/unlocks
    this.getAccounts();
    this.intervalIds.push(setInterval(this.getAccounts.bind(this), web3RefreshInterval));

    // Monitor for Ethereum Network changes
    this.getNetwork();
    this.intervalIds.push(setInterval(this.getNetwork.bind(this), web3RefreshInterval));

    // Define how frequently we check out Smart Contract
    const smartContractRefreshInterval = 5000;

    // Monitor for block updates
    this.getLatestBlock();
    this.intervalIds.push(setInterval(this.getLatestBlock.bind(this), smartContractRefreshInterval));

    // Monitor for the last button clicks
    this.getLastClicks();
    this.intervalIds.push(setInterval(this.getLastClicks.bind(this), smartContractRefreshInterval));

    // Monitor for game generation changes
    this.getGameGeneration();
    this.intervalIds.push(setInterval(this.getGameGeneration.bind(this), smartContractRefreshInterval));

    // Monitor block number for victory changes
    this.getBlockNumberForVictory();
    this.intervalIds.push(setInterval(this.getBlockNumberForVictory.bind(this), smartContractRefreshInterval));

    // Monitor token ownership for the current user
    this.getTokenOwnership();
    this.intervalIds.push(setInterval(this.getTokenOwnership.bind(this), smartContractRefreshInterval));
  }

  render() {
    return (
      <div className="app">
        <Header accounts={this.state.accounts} networkId={this.state.networkId} />
        <Tooltip hasWeb3={this.state.hasWeb3} accounts={this.state.accounts} />
        
        <main className="container">
          <div className="item" >
            <Hero />
            <TheButton onClick={this.onButtonClickedBinding}
              currentBlockNumber={this.state.currentBlockNumber} 
              victoryBlockNumber={this.state.victoryBlockNumer} 
              requiredBlocksElapsedForVictory={this.state.requiredBlocksElapsedForVictory} />
            {this.state.myErc721Clicks && this.state.myErc721Clicks.length > 0 && <Clicks erc721Clicks={this.state.myErc721Clicks}/> }
            {this.state.totalSupply > 0 && <Stats gameGeneration={this.state.gameGeneration} clicks={this.state.totalSupply} erc721Clicks={this.state.lastErc721Clicks} /> }
            <Faq />
          </div>
        </main>

        <Footer />        
      </div>
    );
  }
}

export default App