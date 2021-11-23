import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../themes/theme';
const useStyles = makeStyles(() => ({
  root: {
    width: '500px',
    marginTop: theme.spacing(16),
    marginLeft: theme.spacing(7),
  },
  heading: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    color: 'black',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  listing: {
    marginBottom: theme.spacing(-10),
  },
}));

export default useStyles;
