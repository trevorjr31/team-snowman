import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    marginTop: theme.spacing(17),
  },
  divider: {
    height: 50,
    margin: theme.spacing(1),
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  searchBar: {
    width: 650,
    fontWeight: 600,
  },
  searchBarText: {
    fontSize: 14,
    fontWeight: 600,
    borderBottom: 'none',
  },
  dateIcon: {
    opacity: 0.3,
  },
  dateSelector: {
    width: 200,
  },
  dashboard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
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
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    '& .rmdp-today span': {
      backgroundColor: 'white !important',
      color: 'black !important',
      border: 'solid 1px rgb(0,0,0,0.3)',
    },
  },
  clear: {
    marginRight: theme.spacing(-1),
  },
}));

export default useStyles;
