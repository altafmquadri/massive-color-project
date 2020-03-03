import React, { Component } from 'react';
import PaletteList from './PaletteList'
import { Route, Switch } from 'react-router-dom'
import { generatePalette } from './colorHelpers'
import './App.css';
import Palette from './Palette'
import seedColors from './seedColors'


class App extends Component {
  findPalette = id => {
    return seedColors.find(palette => palette.id)
  }
  state = {}
  render() {
    return (
      <Switch>
        <Route exact path="/" render={(routerProps) =>
          <PaletteList palettes={seedColors}
            {...routerProps} />} />
        <Route exact path="/palette/:id"
          render={(routerProps) =>
            <Palette palette={generatePalette(this.findPalette(routerProps.match.params.id))} />} />
        <Route exact path='/palette/:paletteId/:colorId' render={() => <h1>Single Color Page</h1>} />
      </Switch>
    )
  }
}

export default App;
