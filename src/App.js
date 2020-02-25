import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { generatePalette } from './colorHelpers'
import './App.css';
import Palette from './Palette'
import seedColors from './seedColors'


class App extends Component {
  state = {}
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1> Palette</h1>} />
        <Route exact path="/palette/:id" render={() => <h1>Individual</h1>} />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    )
  }
}

export default App;
