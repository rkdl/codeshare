import React from 'react';
import {
  Button,
  withStyles,
  IconButton,
  Dialog,
  DialogTitle,
  Typography,
  Tooltip,
} from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';
import firebase from 'firebase/app';
import {UserContext} from '../../store/User';

const handleGoogleLoginButtonClick = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  await firebase.auth().signInWithPopup(provider);
};

const handleFacebookLoginButtonClick = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  await firebase.auth().signInWithPopup(provider);
};

const handleLogoutButtonClick = () => {
  firebase.auth().signOut();
};

function Account(props) {
  const userContext = React.useContext(UserContext);
  const isLoggedIn = Boolean(userContext.user);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      handleLogoutButtonClick();
    } else {
      setIsOpen(true);
    }
  };

  const {
    classes,
  } = props;

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        classes={{
          paper: classes.dialogPaper,
        }}
      >
        <DialogTitle>
          Select Login Service
        </DialogTitle>
        <Button 
          variant="outlined" 
          className={classes.button}
          onClick={
            () => {
              setIsOpen(false);
              handleFacebookLoginButtonClick();
            }
          }
        >
          Facebook
        </Button>
        <Button
          variant="outlined" 
          className={classes.button}
          onClick={
            () => {
              setIsOpen(false);
              handleGoogleLoginButtonClick();
            }
          }
        >
          Google
        </Button>
      </Dialog>
      <div className={classes.root}>
        <Typography color="inherit">
          {
            isLoggedIn && (
              userContext.user.displayName
            )
          }
        </Typography>
        <Tooltip 
          title={
            isLoggedIn
              ? 'Log out' 
              : 'Log in'
          }
        >
          <IconButton 
            color="inherit"
            onClick={handleButtonClick}
          >
            {
              isLoggedIn
                ? <ExitToAppIcon />
                : <AccountCircleIcon /> 
            }
            
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
}

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
  },
  dialogPaper: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    marginBottom: theme.spacing.unit,
  },
});

export default withStyles(styles)(Account);
