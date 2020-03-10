import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import { withStyles } from '@material-ui/core/styles';
import PaletteFooter from './PaletteFooter'
import styles from './styles/PaletteStyles'

class SingleColorPalette extends Component {
    state = {
        format: 'hex'
    }

    gatherShades = (palette, colorToFilterBy) => {
        let shades = []
        let allColors = palette.colors

        for (let key in allColors) {
            shades = [...shades, ...allColors[key].filter(color => color.id === colorToFilterBy)]
        }
        return shades.slice(1)
    }

    _shades = this.gatherShades(this.props.palette, this.props.colorId)

    changeFormat = val => {
        this.setState({ format: val });
    }

    render() {
        const { format } = this.state
        const { paletteName, emoji, id } = this.props.palette
        const { classes } = this.props
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.hex}
                name={color.name}
                background={color[format]}
                showingFullPalette={false} />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat}
                    showingAllColors={false} />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} >Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette)