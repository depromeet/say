import React, { Component } from 'react';
import SayAnything from './containers/SayAnything'
import { BrowserRouter as Router } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Router>
        <SayAnything/>
      </Router>
    );
  }
}

export default App;
