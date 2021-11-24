import Grid from '@material-ui/core/Grid';
import WeekPicker from '../DatePicker/WeekPicker/WeekPicker';
import useStyles from './useStyles';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container component="main">
      <WeekPicker />
    </Grid>
  );
}
