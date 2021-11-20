import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: theme.spacing(5),
  },
  message: {
    textDecoration: 'none',
  },
}));

export default useStyles;
