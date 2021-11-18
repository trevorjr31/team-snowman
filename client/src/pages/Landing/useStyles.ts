import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    minWidth: '100vw',
    display: 'flex',
  },
  column: {
    width: '50vw',
  },
  dogs: {
    width: '100%',
    height: '100%',
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100%',
  },
  welcome: {
    padding: '100px 0px 30px 0px',
    width: 300,
  },
}));

export default useStyles;
