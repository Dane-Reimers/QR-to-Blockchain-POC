import React, { Component } from 'react';
 
class QR extends Component {

  componentDidMount() {
    this.scan().then(() => 
    this.loadBlockchainData()
    )
  }

  async scan() {
    await this.props.contract.scan(this.state.id)
  }

  async loadBlockchainData() {
    const timesScanned = await this.props.contract.getTimesScanned(this.state.id)
    this.setState({ timesScanned: parseInt(timesScanned) })
  }

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      timesScanned: null
    }
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