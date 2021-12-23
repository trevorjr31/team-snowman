import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    objectFit: 'cover',
  },
  welcome: {
    padding: '0px 0px 50px 0px',
  },
  submit: {
    width: 300,
    height: 70,
    borderRadius: theme.shape.borderRadius,
    marginTop: 10,
    fontSize: 16,
    backgroundColor: '#f14140',
    fontWeight: 600,
  },
}));

export default useStyles;
