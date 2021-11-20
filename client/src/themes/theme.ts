import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    button: {
      fontFamily: '"Roboto"',
    },
    body1: {
      color: '#f14140',
    },
    h2: {
      fontSize: 34,
      color: '#000000',
      fontWeight: 700,
      fontFamily: "'Arial'",
    },
    h3: {
      fontSize: 18,
      color: '#000000',
      fontWeight: 500,
      fontFamily: "'Arial'",
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    h5: {
      fontSize: 26,
      color: '#000000',
      fontWeight: 700,
      fontFamily: "'Roboto'",
      textAlign: 'center',
    },
    subtitle1: {
      fontSize: 14,
      color: '#ffffff',
      fontFamily: "'Roboto'",
    },
    h6: {
      fontSize: 12,
      color: '#888888',
      textAlign: 'center',
    },
  },
  palette: {
    primary: { main: '#f14140' },
    secondary: { main: '#ffffff' },
  },
  shape: {
    borderRadius: 5,
  },
});
