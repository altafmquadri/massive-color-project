import React, { Component } from 'react';
import './App.css';
import Palette from './Palette'
import seedColors from './seedColors'


class App extends Component {
  state = {}
  render() {
    return (
      <div>
        <Palette {...seedColors[4]} />
      </div>
    );
  }
}

export default App;
