import React, { Component } from 'react';
import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './ColorPickerForm'
import DraggableColorList from './DraggableColorList'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { arrayMove } from 'react-sortable-hoc';
import styles from './styles/NewPaletteFormStyles'
import seedColors from './seedColors'

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }

    state = {
        open: true,
        colors: seedColors[0].colors,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor = (newColor) => {
        this.setState({
            colors: [...this.state.colors, newColor],
            newColorName: ''
        })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLocaleLowerCase().replace(/ /g, '-')
        newPalette.colors = this.state.colors
        this.props.savePalette(newPalette)
        this.props.history.push('/')
    }

    removeColor = (colorName) => {
        this.setState(
            { colors: this.state.colors.filter(c => c.name !== colorName) })
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }))
    }

    clearColors = () => {
        this.setState({ colors: [] });
    }

    addRandomColor = () => {
        const allColors = seedColors.map(p => p.colors).flat();
        let randomColor;
        let rand
        let isDuplicateColor = true;
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            isDuplicateColor = this.state.colors.some(col => col.name === allColors[rand].name);
            randomColor = allColors[rand];
        }
        this.setState({ colors: [...this.state.colors, randomColor] });
    }

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant='h4' gutterBottom>Design your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button
                                className={classes.button}
                                variant='contained'
                                color='secondary'
                                onClick={this.clearColors}
                            >Clear Palette
                        </Button>

                            <Button
                                className={classes.button}
                                variant='contained'
                                color='primary'
                                onClick={this.addRandomColor}
                                disabled={paletteIsFull}
                            >
                                Random Color
                        </Button>
                        </div>
                        <ColorPickerForm
                            paletteIsFull={paletteIsFull}
                            addNewColor={this.addNewColor}
                            colors={colors} />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={this.state.colors}
                        removeColor={this.removeColor}
                        axis='xy'
                        onSortEnd={this.onSortEnd}
                        distance={20}
                    />
                </main>
            </div>
        );
    }

}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);