import React, { Component } from 'react';
import { generatePalette } from './colorHelpers'
import './App.css';
import Palette from './Palette'
import seedColors from './seedColors'


class App extends Component {
  state = {}
  render() {
    console.log(generatePalette(seedColors[4]))
    return (
      <div>
        <Palette {...seedColors[4]} />
      </div>
    );
  }
}

export default App;
