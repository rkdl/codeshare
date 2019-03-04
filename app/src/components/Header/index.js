import React from 'react';
import {
  AppBar, 
  Toolbar,
  Typography,
  withStyles, 
} from '@material-ui/core';
import Account from '../Account';

function Header(props) {
  const {
    classes
  } = props;

  return (
    <AppBar 
      position="static"
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.logoContainer}>
          <Typography 
            className={classes.logoText}
            color="inherit"
          >
            CodeShare
          </Typography>
        </div>
        <Account />
      </Toolbar>
    </AppBar>
  );
}

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoContainer: {
    display: 'flex',
  },
  logo: {
    height: 20,
    marginRight: 10,
  },
  logoText: {
    fontWeight: 800,
    color: 'white',
    fontSize: 20,
    lineHeight: '20px',
  },
});

export default withStyles(styles)(Header);
