import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from './colorHelpers'
import Palette from './Palette'
import seedColors from './seedColors'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './App.css'

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
          <CSSTransition key={location.key} classNames='fade' timeout={500}>
            <Switch location={location}>
              <Route exact path='/palette/new' render={(routerProps) =>
                <div className='page'>
                  <NewPaletteForm
                    savePalette={this.savePalette}
                    palettes={this.state.palettes}
                    {...routerProps}
                  />
                </div>} />

              <Route exact path='/palette/:paletteId/:colorId'
                render={(routerProps) =>
                  <div className='page'>
                    <SingleColorPalette
                      colorId={routerProps.match.params.colorId}
                      palette={generatePalette(this.findPalette(routerProps.match.params.paletteId))}
                    />
                  </div>} />

              <Route exact path="/" render={(routerProps) =>
                <div className='page'>
                  <PaletteList palettes={this.state.palettes}
                    deletePalette={this.deletePalette}
                    {...routerProps}
                  />
                </div>} />

              <Route exact path="/palette/:id"
                render={(routerProps) =>
                  <div className='page'>
                    <Palette palette={generatePalette(this.findPalette(routerProps.match.params.id))}
                    />
                  </div>} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    )
  }
}
export default App;
