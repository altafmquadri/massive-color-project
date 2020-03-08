import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles'



class ColorPickerForm extends Component {
    state = {
        currentColor: 'teal',
        newColorName: ''
    }

    updateCurrentColor = newColor => {
        this.setState({ currentColor: newColor.hex });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor)
        this.setState({ newColorName: "" });
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }

    render() {
        const { paletteIsFull, classes } = this.props
        const { currentColor, newColorName } = this.state
        return (
            <div>
                <ChromePicker
                    className={classes.picker}
                    color={currentColor}
                    onChangeComplete={(newColor => this.updateCurrentColor(newColor))}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        className={classes.colorNameInput}
                        variant='filled'
                        value={newColorName}
                        margin='normal'
                        placeholder='Color Name'
                        name='newColorName'
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used']}
                    />
                    <Button
                        className={classes.addColor}
                        variant='contained'
                        color='primary'
                        style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
                        type='submit'>
                        {paletteIsFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);