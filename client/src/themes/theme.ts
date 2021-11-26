import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    button: {
      fontFamily: '"Roboto"',
    },
    subtitle1: {
      fontSize: 10,
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    subtitle2: {
      fontSize: 14,
      color: '#000000',
      fontWeight: 'lighter',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    body1: {
      color: '#f14140',
    },
    body2: {
      fontSize: 14,
      color: '#000000',
      textAlign: 'center',
      textTransform: 'capitalize',
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
    h6: {
      fontSize: 12,
      color: '#888888',
      textAlign: 'center',
    },
  },
  palette: {
    primary: { main: '#f14140' },
    secondary: { main: '#FFFFFF' },
  },
  shape: {
    borderRadius: 5,
  },
});
