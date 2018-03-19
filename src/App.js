import React, { Component } from 'react'
import ButtonClickGameContract from '../build/contracts/ButtonClickGameContract.json'
import getWeb3 from './utils/getWeb3'
import Header from './components/Header/Header'
import Tooltip from './components/Tooltip/Tooltip'
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
      accounts: null,
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
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
    var buttonClickGameInstance

    // Get accounts.
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
    })
  }

  render() {
    return (
      <div className="App">
        <Header accounts={this.state.accounts} />
        
        <main className="container">
          <Tooltip />
          <div className="pure-g">
            <TheButton />
          </div>
          <Stats gameGeneration={this.state.gameGeneration} clicks={this.state.clicks} />
          <Clicks />
          <Faq />
        </main>

        <Footer />        
      </div>
    );
  }
}

export default App
