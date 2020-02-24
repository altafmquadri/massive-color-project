import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import ColorBox from './ColorBox'
import './Palette.css'
import 'rc-slider/assets/index.css';

class Palette extends Component {
    state = {
        level: 500
    }

    changeLevel = (level) => {
        this.setState({ level });
    }
    render() {
        const { level } = this.state
        const { colors } = this.props.palette
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color.hex} name={color.name} />))
            
        return (
            <div className='Palette'>
                <Slider defaultValue={level}
                    min={100}
                    max={900}
                    step={100}
                    onAfterChange={this.changeLevel} />
                {/* Navbar goes here */}
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                {/* footer  */}
            </div>
        )
    }
}

export default Palette;