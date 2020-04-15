import React, { Component } from 'react';
import {
  Route,
  HashRouter,
  NavLink
} from "react-router-dom";
import { ethers } from "ethers";
import Home from './Home.js';
import QR from './QR.js';
import './App.css';
import {QR_CONTRACT_ADDRESS, QR_CONTRACT_ABI} from './config.js';

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const Wallet = ethers.Wallet;
    const Contract = ethers.Contract;
    const utils = ethers.utils;
    const providers = ethers.providers; 

    //Note the "0x" appended at the start
    let privateKey = process.env.serverWalletKey;

    let network = "ropsten";

    //let network = "kovan";
    //let network = "ropsten";
    //let network = "rinkeby";
    //let network = "homestead";

    let infuraAPIKey = process.env.infuraAPIKey;

    //let provider = new providersJsonRpcProvider(network, 'homestead');
    let provider = new providers.InfuraProvider(network, infuraAPIKey);
    this.state.provider = provider;

    let serverWallet = new Wallet(privateKey, provider);
    this.state.serverWallet = serverWallet;

    let contract = new ethers.Contract(QR_CONTRACT_ADDRESS, QR_CONTRACT_ABI, serverWallet)
    this.state.contract = contract
  }

  constructor(props) {
    super(props)
    this.state = { serverWallet: null, provider: null, contract: null }
  }

  render() {
    return (
      <HashRouter>
        <div >
          <div className="content">
            <Route exact path="/" render={props =>
                <Home {...props} />
              }
            />
            <Route exact path="/qr/:id" render={props =>
                this.state.contract && this.state.serverWallet &&
                <QR contract={this.state.contract} serverWallet={this.state.serverWallet} {...props} />
              }
            />
          </div>
        </div>

      </HashRouter>
    );
  }
}

export default App;
