import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../themes/theme';
const useStyles = makeStyles(() => ({
  button: {
    marginRight: theme.spacing(1),
    opacity: 0.5,
  },
  menuText: {
    color: 'black',
  },
}));

export default useStyles;
