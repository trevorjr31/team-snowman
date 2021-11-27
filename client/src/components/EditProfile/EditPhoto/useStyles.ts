import { makeStyles } from '@material-ui/core/styles';
import { keyframes } from '@mui/styled-engine';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2.5),
  },
  paper: {
    height: '650px',
  },
  title: {
    padding: theme.spacing(5),
  },
  reminder: {
    padding: theme.spacing(2.5),
    width: '16vw',
    color: '#ff0000',
    animation: '$colorAnimate 10s infinite',
  },
  '@keyframes colorAnimate': {
    '0%': { color: '#ff0000' },
    '33%': { color: '#00ff00' },
    '66%': { color: '#0000ff' },
    '100%': { color: '#ff0000' },
  },
  centerRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1.25),
    width: '140px',
    height: '140px',
    alignSelf: 'center',
  },
  uploadButton: {
    textTransform: 'none',
    fontWeight: 700,
    padding: theme.spacing(1.5, 3.75, 1.5, 3.75),
    margin: theme.spacing(2.25, 0, 2.25, 0),
  },
  deleteIcon: {
    width: '20px',
    height: '20px',
  },
  deleteText: {
    margin: theme.spacing(1.25),
  },
}));

export default useStyles;
