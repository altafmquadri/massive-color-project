import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles'
import DeleteIcon from '@material-ui/icons/Delete'



class MiniPalette extends React.Component {

    deletePalette = (e, id) => {
        e.stopPropagation()
        this.props.handleDelete(id)
    }

    render() {
        const { classes, paletteName, emoji, colors, handleClick, id } = this.props
        const miniColorBoxes = colors.map(color => (
            <div className={classes.miniColor}
                style={{ backgroundColor: color.color }}
                key={color.name}>
            </div>
        ))
        return (
            <div className={classes.root} onClick={() => handleClick(id)}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{ transition: 'all 0.3s ease-in-out' }}
                    onClick={e => this.deletePalette(e, id)} />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName}
                    <span className={classes.emoji}>{emoji}</span></h5>
            </div >
        )
    }
}

export default withStyles(styles)(MiniPalette)