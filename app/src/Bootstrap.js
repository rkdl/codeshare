import {CircularProgress, createStyles, withStyles} from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import App from './App';
import FIREBASE_CONFIG from './config/firebase';
import {UserContext} from './store/User';

firebase.initializeApp(FIREBASE_CONFIG);

function Bootstrap(props) {
  const {classes} = props;

  const userContext = React.useContext(UserContext);

  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        try {
          await userContext.setUser(user);
        } catch (error) {
          user.delete();
          alert(error.message);
        }
      } else {
        userContext.resetUser();
      }

      setIsReady(true);
    });
  }, []);

  return isReady ? (
    <App />
  ) : (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

const styles = theme =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default withStyles(styles)(Bootstrap);
