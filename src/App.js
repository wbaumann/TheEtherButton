import React, { Component } from 'react'
import ButtonClickGameContract from '../build/contracts/ButtonClickGameContract.json'
import getWeb3 from './utils/getWeb3'
import Header from './components/Header/Header'
import Tooltip from './components/Tooltip/Tooltip'
import Hero from './components/Hero/Hero'
import TheButton from './components/TheButton/TheButton'
import Stats from './components/Stats/Stats'
import Clicks from './components/Clicks/Clicks'
import Faq from './components/Faq/Faq'
import Footer from './components/Footer/Footer'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameGeneration: -1,
      clicks: 0,
      web3: null,
      hasWeb3: false,
      accounts: null,
      networkId: -1,
      currentBlockNumber: 0,
      victoryBlockNumer: 20,
      requiredBlocksElapsedForVictory: 20,
      lastErc721Clicks: null,
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
        console.log('latest: ', result.number, result.timestamp);
      }
    });
  }

  getLastClicks() {
    const contract = require('truffle-contract');
    const buttonClickGame = contract(ButtonClickGameContract);
    buttonClickGame.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var buttonClickGameInstance;

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
          let promises = [];
          // Get our last 3 clicks
          if (totalSupply >= 3) {
            promises.push(buttonClickGameInstance.getClickMetadata.call(totalSupply - 3, {from: account}));
          }
          if (totalSupply >= 2) {
            promises.push(buttonClickGameInstance.getClickMetadata.call(totalSupply - 2, {from: account}));
          }
          if (totalSupply >= 1) {
            promises.push(buttonClickGameInstance.getClickMetadata.call(totalSupply - 1, {from: account}));
          }
          return Promise.all(promises);
        })
        .then((clickMetadataArray) => {
          let lastErc721Clicks = [];
          clickMetadataArray.forEach(clickMetadata => {
            let lastErc721Click = {
              blocksAwayFromDesiredBlock: clickMetadata[0].c[0],
              clickTime: clickMetadata[1].c[0],
              clickGeneration: clickMetadata[2].c[0]
            };
            lastErc721Clicks.push(lastErc721Click);
          });
          return lastErc721Clicks;
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

  test() {
    this.setState({currentBlockNumber: this.state.currentBlockNumber + 1})
  }

  onButtonClicked() {
    if (this.state.web3) {
      const contract = require('truffle-contract')
      const buttonClickGame = contract(ButtonClickGameContract)
      buttonClickGame.setProvider(this.state.web3.currentProvider)

      // Declaring this for later so we can chain functions on SimpleStorage.
      var buttonClickGameInstance;

      this.state.web3.eth.getAccounts((error, accounts) => {
        if (!error && accounts && accounts.length > 0) {
          let account = accounts[0];
          buttonClickGame.deployed().then((instance) => {
            buttonClickGameInstance = instance;
            return instance;
          }).then((result) => {
            // Get the value from the contract to prove it worked.
            // return buttonClickGameInstance.clickButton({from: account, value: 1000000000000000, gas: 25000});
            this.state.web3.eth.sendTransaction({from: account, to: buttonClickGameInstance.address, value: 1000000000000000, gas: 25000});

            return "";
          })
          .catch(e => {
            console.log('Failed to send this Tx. ' + e);
          });
        }
      });
    }
  }

  instantiateContract(web3) {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const buttonClickGame = contract(ButtonClickGameContract)
    buttonClickGame.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var buttonClickGameInstance;

    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({ accounts: accounts})

      buttonClickGame.deployed().then((instance) => {
        buttonClickGameInstance = instance
        return instance
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return buttonClickGameInstance.gameGeneration.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ gameGeneration: result.c[0] })
      })
      .catch(e => {
        console.log('Failed to find game. ' + e);
      });
    });

    // Monitor accounts changes/unlocks
    this.getAccounts();
    this.intervalIds.push(setInterval(this.getAccounts.bind(this), 250));

    // Monitor for Ethereum Network changes
    this.getNetwork();
    this.intervalIds.push(setInterval(this.getNetwork.bind(this), 1000));

    // Monitor for block updates
    this.getLatestBlock();
    this.intervalIds.push(setInterval(this.getLatestBlock.bind(this), 5000));

    // Monitor for the last button clicks
    this.getLastClicks();
    this.intervalIds.push(setInterval(this.getLastClicks.bind(this), 1000));

    // Test monitor
    this.intervalIds.push(setInterval(this.test.bind(this), 10000));
  }

  render() {

    const myErc721Clicks = null;
    /*
    const myErc721Clicks = [
      {blocksAwayFromDesiredBlock: 16, clickTime:1273185387, clickGeneration: 1},
      {blocksAwayFromDesiredBlock: 11, clickTime:1276185387, clickGeneration: 2},
      {blocksAwayFromDesiredBlock: 5, clickTime:1289185387, clickGeneration: 3},
    ]
    */

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
            {myErc721Clicks && <Clicks erc721Clicks={myErc721Clicks}/> }
            <Stats gameGeneration={this.state.gameGeneration} clicks={this.state.clicks} erc721Clicks={this.state.lastErc721Clicks} />
            <Faq />
          </div>
        </main>

        <Footer />        
      </div>
    );
  }
}

export default App