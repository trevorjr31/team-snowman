import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

const useStyles = makeStyles(() => ({
  btn: {
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    fontSize: 13,
    fontWeight: 'bold',
    opacity: 0.6,
  },
}));

export default useStyles;
