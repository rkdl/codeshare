import React, { useEffect } from 'react';
import { CodeContext } from '../../store/Code';
import { Typography, withStyles } from '@material-ui/core';

function Footer(props) {
    const codeContext = React.useContext(CodeContext);
    const { classes } = props;
    useEffect(() => {
        codeContext.getTotalStatistics()
    }, [])

    return (
        <footer>
            {codeContext.totalStatistic !== undefined && codeContext.totalStatistic.length > 1 &&
                codeContext.totalStatistic.map((item) => <Typography className={classes.text} key={item[0]}>{item[0]} : {item[1]}</Typography>)
            }
        </footer>
    )
}

const styles = theme => ({
    '@global': {
        footer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }
    },
    text: {
        margin: theme.spacing.unit * 2
    }
});

export default withStyles(styles)(Footer)