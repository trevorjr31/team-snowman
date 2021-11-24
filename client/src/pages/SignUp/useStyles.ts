import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: theme.spacing(6),
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100%',
  },
  welcome: {
    paddingBottom: 20,
  },
}));

export default useStyles;
