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
    body1: {
      color: '#f14140',
    },
    body2: {
      fontSize: 13,
      color: 'black',
      fontWeight: 500,
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
    h6: {
      fontSize: 12,
      textAlign: 'center',
    },
    subtitle2: {
      fontSize: 14,
      color: '#ffffff',
      fontFamily: "'Roboto'",
    },
  },
  palette: {
    primary: { main: '#f14140' },
    secondary: { main: '#ffffff' },
    warning: { main: '#00cc00' },
    info: { main: '#0000ee' },
  },
  shape: {
    borderRadius: 5,
  },
  overrides: {
    MuiTypography: {
      h6: {
        color: '#888888',
      },
    },
  },
});
