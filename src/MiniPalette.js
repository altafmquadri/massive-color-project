import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    main: {
        backgroundColor: 'purple',
        border: '3px solid teal',
        "& h1": {
            color: 'white'
        }
    },
    secondary: {
        backgroundColor: 'pink'
    }
}

const MiniPalette = props => {
    const { classes } = props
    console.log(props)
    return (
        <div className={classes.main}>
            <h1>Mini Palette</h1>
            <section className={classes.secondary}>Test</section>
        </div>

    )
}

export default withStyles(styles)(MiniPalette)