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
        const { colors } = this.props.palette
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name} />))

        return (
            <div className='Palette'>
                <Navbar level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat} />
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                {/* footer  */}
            </div >
        )
    }
}

export default Palette;