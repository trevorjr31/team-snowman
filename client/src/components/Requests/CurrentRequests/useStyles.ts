import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../themes/theme';
const useStyles = makeStyles(() => ({
  root: {
    width: '500px',
    height: '600px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    marginTop: theme.spacing(13),
    marginLeft: theme.spacing(7),
    '&::-webkit-scrollbar': { width: 8 },
    '&::-webkit-scrollbar-track': {
      background: 'white',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'grey',
      borderRadius: theme.shape.borderRadius,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },
  heading: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    marginLeft: theme.spacing(4),
    color: 'black',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  listing: {
    paddingLeft: theme.spacing(4),
  },
}));

export default useStyles;
