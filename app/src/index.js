import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from './Bootstrap';
import UserContextProvider from './store/User';
import CodeContextProvider from './store/Code';
import * as serviceWorker from './serviceWorker';
import {CssBaseline, MuiThemeProvider} from '@material-ui/core';
import {darkTheme} from './theme';
import hljs from 'highlight.js';
import {SUPPORTED_LANGUAGES_RAW} from './utils/highlighting';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

hljs.configure({languages: SUPPORTED_LANGUAGES_RAW});

ReactDOM.render(
  <Router history={history}>
    <MuiThemeProvider theme={darkTheme}>
      <UserContextProvider>
        <CodeContextProvider>
          <CssBaseline />
          <Bootstrap />
        </CodeContextProvider>
      </UserContextProvider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);

serviceWorker.register();
