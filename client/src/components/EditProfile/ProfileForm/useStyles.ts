import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  title: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  inputs: {
    height: '2rem',
    padding: '12px',
  },
  forgot: {
    paddingRight: 10,
  },
  label: {
    width: 90,
    flexShrink: 0,
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  field: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& > *': {
      margin: '1em',
    },
  },
}));

export default useStyles;
