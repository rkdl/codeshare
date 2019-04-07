import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from './Bootstrap';
import UserContextProvider from './store/User';
import * as serviceWorker from './serviceWorker';
import {CssBaseline, MuiThemeProvider} from '@material-ui/core';
import {darkTheme} from './theme';
import hljs from 'highlight.js';
import {SUPPORTED_LANGUAGES_RAW} from "./lib/highlighting";

hljs.configure({languages: SUPPORTED_LANGUAGES_RAW});


ReactDOM.render(
  <MuiThemeProvider theme={darkTheme}>
    <UserContextProvider>
      <CssBaseline />
      <Bootstrap />
    </UserContextProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
