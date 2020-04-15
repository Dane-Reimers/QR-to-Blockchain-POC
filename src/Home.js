import React, { Component } from "react";
 
class Home extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            QR Codes
          </h1>
          <h2>QR Code 1</h2>
          <img src={require("./QRCodes/QR1.png")}/>
          <hr/>
          <h2>QR Code 2</h2>
          <img src={require("./QRCodes/QR2.png")}/>
          <hr/>
          <h2>QR Code 3</h2>
          <img src={require("./QRCodes/QR3.png")}/>
          <hr/>
          <h2>QR Code 4</h2>
          <img src={require("./QRCodes/QR4.png")}/>
        </header>
      </div>
    );
  }
}
 
export default Home;