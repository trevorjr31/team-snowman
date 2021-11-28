import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fieldLabel: {
    color: 'black',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  dateSelectText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 600,
  },
  calendarIcon: { opacity: 0.4 },
  submit: {
    margin: theme.spacing(1, 2, 2),
    padding: 10,
    width: 170,
    height: 50,
    borderRadius: theme.shape.borderRadius,
    fontSize: 11,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: 600,
    textDecoration: 'none',
  },
  cardMain: {
    height: '375px',
    width: '350px',
    marginTop: theme.spacing(16),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
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
}));

export default useStyles;
