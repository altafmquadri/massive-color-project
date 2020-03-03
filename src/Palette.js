import React, { Component } from 'react';
import ColorBox from './ColorBox'
import './Palette.css'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter';

class Palette extends Component {
    state = {
        level: 500,
        format: 'hex'
    }

    changeFormat = val => {
        this.setState({ format: val });
    }

    changeLevel = (level) => {
        this.setState({ level });
    }
    render() {
        const { level, format } = this.state
        const { colors, paletteName, emoji, id } = this.props.palette
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                key={color.id}
                background={color[format]}
                name={color.name}
                id={color.id}
                moreUrl={`/palette/${id}/${color.id}`}
                showingFullPalette={true} />))

        return (
            <div className='Palette'>
                <Navbar level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showingAllColors />
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div >
        )
    }
}

export default Palette;