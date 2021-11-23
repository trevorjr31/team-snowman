import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../themes/theme';
const useStyles = makeStyles(() => ({
  date: {
    color: 'black',
    fontSize: 18,
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  ownerInfo: {
    marginLeft: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  ownerName: {
    marginLeft: theme.spacing(2),
    color: 'black',
    fontSize: 18,
    fontWeight: 600,
  },
  menuList: {
    display: 'inline',
  },
  menuNext: {
    display: 'none',
  },
  status: {
    textTransform: 'uppercase',
    marginLeft: theme.spacing(25),
    fontWeight: 600,
    color: 'rgb(0,0,0,0.3)',
  },
  respondStatus: {
    textTransform: 'uppercase',
    marginLeft: theme.spacing(25),
    fontWeight: 600,
    color: theme.palette.primary.main,
    opacity: 0.7,
  },
}));

export default useStyles;
