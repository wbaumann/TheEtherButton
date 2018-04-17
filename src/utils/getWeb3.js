// eslint-disable-next-line
import Web3 from 'web3';

const getWeb3 = new Promise(((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', () => {
    let results;
    let { web3 } = window;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);

      results = {
        web3,
      };

      console.log('Injected web3 detected.');

      resolve(results);
    } else {
      results = {
        web3: null,
      };

      console.log('No web3 instance injected.');

      resolve(results);
    }
  });
}));

export default getWeb3;
