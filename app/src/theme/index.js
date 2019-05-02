import {createMuiTheme} from '@material-ui/core';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    useNextVariants: true,
  },
});
