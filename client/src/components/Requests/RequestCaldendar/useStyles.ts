import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../themes/theme';
const useStyles = makeStyles(() => ({
  root: {
    width: '500px',
    height: '600px',
    marginTop: theme.spacing(13),
    marginLeft: theme.spacing(7),
  },
  calendar: {
    transform: 'scale(2)',
    '& .rmdp-header-values': {
      color: theme.palette.primary.main,
      fontWeight: 500,
    },
    '& .rmdp-calendar': {
      width: '350px',
      height: '280px',
    },
    '& .rmdp-day-picker': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& .rmdp-arrow': {
      border: 'solid #000000',
      borderWidth: '0 2px 2px 0',
      opacity: '0.3',
    },
    '& .rmdp-week': {
      width: '310px',
    },
    '& .rmdp-day span:hover': {
      backgroundColor: 'none',
    },
    '& .rmdp-day span:focus': {
      backgroundColor: 'none',
    },
    '& .rmdp-deactive': {
      opacity: 0.3,
    },
    '& .rmdp-selected span': {
      backgroundColor: `${theme.palette.primary} !important`,
    },
    '& .rmdp-today span': {
      backgroundColor: 'white !important',
      color: 'black !important',
      border: 'solid 1px rgb(0,0,0,0.3)',
    },
  },
}));

export default useStyles;
