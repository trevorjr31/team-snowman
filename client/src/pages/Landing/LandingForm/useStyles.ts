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
  datePicker: {
    width: 300,
  },
  forgot: {
    paddingRight: 10,
  },
  submit: {
    width: 300,
    height: 70,
    borderRadius: theme.shape.borderRadius,
    marginTop: 36,
    fontSize: 16,
    backgroundColor: '#f14140',
    fontWeight: 600,
  },
}));

export default useStyles;
