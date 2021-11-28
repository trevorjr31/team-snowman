import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../themes/theme';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: '70px',
    width: '70px',
    marginRight: theme.spacing(2),
  },
  mainText: {
    color: 'black',
    fontWeight: 600,
  },
  typeText: {
    marginBottom: theme.spacing(0.75),
    marginTop: theme.spacing(-0.5),
    fontWeight: 600,
    color: 'rgb(0,0,0,0.4)',
  },
}));

export default useStyles;
