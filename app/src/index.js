import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from './Bootstrap';
import UserContextProvider from './store/User';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';

ReactDOM.render(
  (
    <UserContextProvider>
      <CssBaseline />
      <Bootstrap />
    </UserContextProvider>
  ), 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
