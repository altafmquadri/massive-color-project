import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class PaletteMetaForm extends Component {
    state = {
        open: true,
        newPaletteName: ''
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    render() {
        const { newPaletteName } = this.state
        const { handleSubmit, hideForm } = this.props
        return (
            <Dialog
                open={this.state.open}
                onClose={hideForm}
                aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>

                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new palette. Make sure it's unique.
                        </DialogContentText>
                        <Picker/>
                        <TextValidator
                            label='Palette Name'
                            value={newPaletteName}
                            name='newPaletteName'
                            fullWidth
                            margin="normal"
                            onChange={this.handleChange}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter Palette Name', 'Name already used']} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color="primary">
                            Cancel
                            </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'>
                            Save Palette</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}
export default PaletteMetaForm;