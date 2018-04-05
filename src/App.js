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
    }
    this.intervalIds = [];
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

  accountRefresher() {
    this.state.web3.eth.getAccounts((error, accounts) => {
      if (!error) {
        this.setState({ accounts: accounts})
      }
    });
  }

  blockCounter() {
    this.state.web3.eth.getBlock('latest', (error, result) => {
      if (!error) {
        console.log('latest: ', result.number, result.timestamp)
      }
    });
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

    // Get accounts.
    this.intervalIds.push(setInterval(this.accountRefresher.bind(this), 250));

    // Get active network
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

    // Watch for block updates
    this.intervalIds.push(setInterval(this.blockCounter.bind(this), 5000));
  }

  render() {
    return (
      <div className="app">
        <Header accounts={this.state.accounts} networkId={this.state.networkId} />
        <Tooltip hasWeb3={this.state.hasWeb3} accounts={this.state.accounts} />
        
        <main className="container">
          <div className="item" >
            <Hero />
            <TheButton />
            <Stats gameGeneration={this.state.gameGeneration} clicks={this.state.clicks} />
            <Clicks />
            <Faq />
          </div>
        </main>

        <Footer />        
      </div>
    );
  }
}

export default App
