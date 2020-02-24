import React, { Component } from 'react';
import './ColorBox.css'

class ColorBox extends Component {
    state = {}
    render() {
        console.log(this.props)
        return (
            <div style={{ background: this.props.background }} className='ColorBox'>
                <span>{this.props.name}</span>
                <span>More</span>
            </div>
        )
    }
}

export default ColorBox;