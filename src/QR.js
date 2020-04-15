import React, { Component } from 'react';
import { ethers } from "ethers";
import {QR_CONTRACT_ADDRESS, QR_CONTRACT_ABI} from './config.js';
 
class QR extends Component {

  componentDidMount() {
    this.loadBlockchainData().then(() => 
    this.scan().then(() =>
    this.loadTimes()
    ))
  }

  async loadBlockchainData() {
    const Wallet = ethers.Wallet;
    const Contract = ethers.Contract;
    const utils = ethers.utils;
    const providers = ethers.providers; 

    //Note the "0x" appended at the start
    let privateKey = process.env.REACT_APP_SERVER_WALLET_KEY;

    let network = "ropsten";

    //let network = "kovan";
    //let network = "ropsten";
    //let network = "rinkeby";
    //let network = "homestead";

    let infuraAPIKey = process.env.REACT_APP_INFURA_KEY;

    //let provider = new providersJsonRpcProvider(network, 'homestead');
    let provider = await new providers.InfuraProvider(network, infuraAPIKey);
    this.state.provider = provider;

    let serverWallet = await new Wallet(privateKey, provider);
    this.state.serverWallet = serverWallet;

    let contract = await new ethers.Contract(QR_CONTRACT_ADDRESS, QR_CONTRACT_ABI, serverWallet)
    this.state.contract = contract
  }

  constructor(props) {
    super(props)
    this.state = {
      serverWallet: null,
      provider: null,
      contract: null,
      id: this.props.match.params.id,
      timesScanned: null
    }
  }

  async scan() {
    await this.state.contract.scan(this.state.id)
  }

  async loadTimes() {
    const timesScanned = await this.state.contract.getTimesScanned(this.state.id)
    this.setState({ timesScanned: parseInt(timesScanned) })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>This QR code has been scanned { this.state.timesScanned } times.</h1>
        </header>
      </div>
    );
  }
}

export default QR;