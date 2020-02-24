import React, { Component } from 'react';
import ColorBox from './ColorBox'
import './Palette.css'
import Navbar from './Navbar'

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
                <Navbar level={level} changeLevel={this.changeLevel}/>
                <div className='Palette-colors'>
                    {colorBoxes}
            </div>
                {/* footer  */ }
            </div >
        )
    }
}

export default Palette;