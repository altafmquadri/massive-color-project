import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import NewPaletteForm from './NewPaletteForm'
import Palette from './Palette'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import Page from './Page'


import { generatePalette } from './colorHelpers'
import seedColors from './seedColors'


const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))

class App extends Component {

  state = {
    palettes: savedPalettes || seedColors
  }

  findPalette = id => {
    return this.state.palettes.find(palette => palette.id === id)
  }

  deletePalette = id => {
    this.setState(st => (
      {
        palettes: st.palettes.filter(p => p.id !== id)
      }), this.syncLocalStorage)
  }

  savePalette = (newPalette) => {
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    }, this.syncLocalStorage)
  }

  syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500}>
            <Switch location={location}>
              <Route exact path='/palette/new' render={(routerProps) =>
                <Page>
                  <NewPaletteForm
                    savePalette={this.savePalette}
                    palettes={this.state.palettes}
                    {...routerProps}
                  />
                </Page>} />

              <Route exact path='/palette/:paletteId/:colorId'
                render={(routerProps) =>
                  <Page>
                    <SingleColorPalette
                      colorId={routerProps.match.params.colorId}
                      palette={generatePalette(this.findPalette(routerProps.match.params.paletteId))}
                    />
                  </Page>} />

              <Route exact path="/" render={(routerProps) =>
                <Page>
                  <PaletteList palettes={this.state.palettes}
                    deletePalette={this.deletePalette}
                    {...routerProps}
                  />
                </Page>} />

              <Route exact path="/palette/:id"
                render={(routerProps) =>
                  <Page>
                    <Palette palette={generatePalette(this.findPalette(routerProps.match.params.id))}
                    />
                  </Page>} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    )
  }
}
export default App;
