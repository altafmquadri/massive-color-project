import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import './Navbar.css'

class Navbar extends Component {
    state = {
        format: 'hex',
        open: false
    }

    closeSnackbar = () => {
        this.setState({ open: false });
    }

    handleFormatChange = e => {
        this.setState({ format: e.target.value, open: true })
        this.props.handleChange(e.target.value)
    }

    render() {
        const { level, changeLevel } = this.props
        const { format, open } = this.state
        return (
            <header className="Navbar">
                <div className='logo'>
                    <a href="#">reactcolorpicker</a>
                </div>
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel} />
                    </div>
                </div>
                <div className='select-container'>
                    <Select
                        value={format}
                        onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
                    </Select>
                    <Snackbar anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                        open={open}
                        autoHideDuration={3000}
                        message={<span>Format Changed To {format.toUpperCase()}</span>}
                        ContentProps={{
                            "aria-describedby": 'message-id'
                        }}
                        onClose={this.closeSnackbar}
                        action={[
                            <IconButton
                                onClick={this.closeSnackbar}
                                color='inherit'
                                key='close'
                                aria-label='close'>
                                <CloseIcon />
                            </IconButton>
                        ]}
                    ></Snackbar>
                </div>
            </header>
        );
    }
}

export default Navbar;