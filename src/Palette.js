import React, { Component } from 'react';
import ColorBox from './ColorBox'
import './Palette.css'
import Navbar from './Navbar'

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
        const { colors, paletteName, emoji } = this.props.palette
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                key={color.id}
                background={color[format]}
                name={color.name} />))

        return (
            <div className='Palette'>
                <Navbar level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat} />
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <footer className="Palette-footer">
                    {paletteName}
                    <span className="emoji">{emoji}</span>
                </footer>
            </div >
        )
    }
}

export default Palette;