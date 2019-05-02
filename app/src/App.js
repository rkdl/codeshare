import React from 'react';
import {Route} from 'react-router-dom';
import EditScreen from './components/screens/Edit';
import ReadScreen from './components/screens/Read';
import {withStyles} from '@material-ui/core';

function App() {
  return (
    <>
      <Route exact path="/" component={EditScreen} />
      <Route path="/edit/:textIdentifier" component={EditScreen} />
      <Route path="/read/:textIdentifier" component={ReadScreen} />
    </>
  );
}

const styles = theme => ({
  '@global': {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default withStyles(styles)(App);
