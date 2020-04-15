import React, { Component } from 'react';
import {
  Route,
  HashRouter,
  NavLink
} from "react-router-dom";
import Home from './Home.js';
import QR from './QR.js';
import './App.css';

class App extends Component {

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
                <QR {...props} />
              }
            />
          </div>
        </div>

      </HashRouter>
    );
  }
}

export default App;
