import React, { Component } from 'react';
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'


class SingleColorPalette extends Component {
    // constructor(props) {
    //     super(props)
    //     this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    //     console.log(this._shades)
    // }
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
        const { paletteName, emoji } = this.props.palette
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.hex}
                name={color.name}
                background={color[format]}
                showLink={false} />
        ))
        return (
            <div className='Palette'>
                <Navbar handleChange={this.changeFormat}
                    showingAllColors={false} />
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default SingleColorPalette;