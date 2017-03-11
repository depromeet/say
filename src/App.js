import React, { Component } from 'react';
import Instagram from './containers/Instagram'
import { BrowserRouter as Router } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Router>
        <Instagram/>
      </Router>
    );
  }
}

export default App;
