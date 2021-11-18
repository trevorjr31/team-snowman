import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    fontWeight: 700,
    textTransform: 'uppercase',
    textAlign: 'left',
    color: '#000000',
    paddingLeft: 5,
    margin: 0,
  },
  inputs: {
    height: 30,
    paddingLeft: 20,
    fontSize: 18,
    margin: 0,
  },
  forgot: {
    paddingRight: 10,
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#f14140',
    fontWeight: 'bold',
  },
}));

export default useStyles;
