import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: '80px',
    width: '80px',
  },
  mainText: {
    color: 'black',
    fontWeight: 600,
  },

  name: {
    fontWeight: 600,
  },
  title: {
    color: 'rgb(0,0,0,0.5)',
    fontWeight: 500,
  },
  address: {
    color: 'rgb(0,0,0,0.5)',
    fontWeight: 500,
    marginTop: theme.spacing(0.3),
    marginLeft: theme.spacing(0.4),
  },
  cardMain: {
    height: '300px',
    width: '275px',
    marginBottom: theme.spacing(5),
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  divider: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(-3),
    width: '275px',
  },
  link: {
    textDecoration: 'none',
  },
}));

export default useStyles;
