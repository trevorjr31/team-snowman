import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    alignItems: 'center',
    alignContent: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    border: 5,
    borderColor: '#00ff00',
    borderWidth: 5,
  },
  smallTitle: {
    fontSize: 19,
    fontWeight: 600,
    marginBottom: 20,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: '5px',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
  },
  forgot: {
    paddingRight: 10,
  },
  submit: {
    padding: 10,
    width: 260,
    height: 50,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 12,
    backgroundColor: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'none',
  },
}));

export default useStyles;
