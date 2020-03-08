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


const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});


class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }

    state = {
        open: true,
        colors: this.props.palettes[0].colors,
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

    handleSubmit = (newPaletteName) => {

        const NewPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
            colors: this.state.colors
        }
        this.props.savePalette(NewPalette)
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
        const allColors = this.props.palettes.map(p => p.colors).flat()
        let rand = Math.floor(Math.random() * allColors.length)
        let randomColor = allColors[rand]
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
                    classes={classes}
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
                    <Typography variant='h4'>Design your Palette</Typography>
                    <div>
                        <Button variant='contained'
                            color='secondary'
                            onClick={this.clearColors}
                        >Clear Palette
                        </Button>

                        <Button
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
                    />

                </main>
            </div>
        );
    }

}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);