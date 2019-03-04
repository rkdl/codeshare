import React from 'react';
import { 
  Router, 
  Route, 
} from 'react-router';
import {createBrowserHistory} from 'history';
import MainScreen from './components/screens/Main';
import {
  withStyles
} from '@material-ui/core';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Route path="/" component={MainScreen}/>
    </Router>
  );
}

const styles = theme => ({
  '@global': {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default withStyles(styles)(App);
