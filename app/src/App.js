import React from 'react';
import {Router, Route} from 'react-router';
import {createBrowserHistory} from 'history';
import EditScreen from './components/screens/Edit';
import ReadScreen from './components/screens/Read';
import {withStyles} from '@material-ui/core';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <>
        <Route exact path="/" component={EditScreen} />
        <Route path="/edit/:textId" component={EditScreen} />
        <Route path="/read/:textId" component={ReadScreen} />
      </>
    </Router>
  );
}

const styles = theme => ({
  '@global': {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default withStyles(styles)(App);
