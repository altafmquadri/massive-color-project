import React, { Component } from 'react';
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import { Route, Switch } from 'react-router-dom'
import { generatePalette } from './colorHelpers'
import './App.css';
import Palette from './Palette'
import seedColors from './seedColors'


class App extends Component {
  findPalette = id => {
    return seedColors.find(palette => palette.id === id)
  }
  state = {}
  render() {
    return (
      <Switch>
        <Route exact path='/palette/new' render={() => <NewPaletteForm />}></Route>

        <Route exact path='/palette/:paletteId/:colorId'
          render={(routerProps) =>
            <SingleColorPalette
              colorId={routerProps.match.params.colorId}
              palette={generatePalette(this.findPalette(routerProps.match.params.paletteId))} />} />

        <Route exact path="/" render={(routerProps) =>
          <PaletteList palettes={seedColors}
            {...routerProps} />} />

        <Route exact path="/palette/:id"
          render={(routerProps) =>
            <Palette palette={generatePalette(this.findPalette(routerProps.match.params.id))} />} />
      </Switch>
    )
  }
}

export default App;
