import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(17),
  },
  title: {
    color: 'black',
    fontSize: 28,
    marginBottom: theme.spacing(4),
    fontWeight: 600,
    textTransform: 'capitalize',
  },
}));

export default useStyles;
