import React, { Component } from 'react';
import MiniPalette from './MiniPalette'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles'

class PaletteList extends Component {
    state = {}
    goToPalette = id => {
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const { palettes, classes } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1> React Colors</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette =>
                            <MiniPalette key={palette.id} {...palette} handleClick={this.goToPalette} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList)