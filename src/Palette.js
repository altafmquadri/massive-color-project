import React, { Component } from 'react';
import ColorBox from './ColorBox'
import { withStyles } from '@material-ui/core/styles';
import './Palette.css'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter';


const styles = {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    colors: {
        height: '90%'
    }
}

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
        const { classes } = this.props
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                key={color.id}
                background={color[format]}
                name={color.name}
                id={color.id}
                moreUrl={`/palette/${id}/${color.id}`}
                showingFullPalette={true} />))

        return (
            <div className={classes.Palette}>
                <Navbar level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showingAllColors />
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div >
        )
    }
}

export default withStyles(styles)(Palette);