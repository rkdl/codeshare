import { 
  createMuiTheme, 
} from '@material-ui/core';

export const lightTheme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    useNextVariants: true,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    useNextVariants: true,
  },
})
