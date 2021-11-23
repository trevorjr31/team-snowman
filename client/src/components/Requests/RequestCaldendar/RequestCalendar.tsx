import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import useStyles from './useStyles';
import { Calendar } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/red.css';
import RequestData from '../../../interface/Request';

interface Props {
  requests: RequestData;
}

export default function RequestCalendar({ requests }: Props): JSX.Element {
  const classes = useStyles();
  const allRequests = requests.nextRequest
    ? [...requests.before, ...requests.after, requests.nextRequest]
    : [...requests.before, ...requests.after];
  const entries = [new Date()];
  allRequests.map((request) => {
    if (request.accepted == true) {
      const date = new Date(request.duration.start);
      entries.push(date);
    }
  });
  return (
    <Grid className={classes.root}>
      <Box marginTop={33} className={classes.calendar} marginLeft={22}>
        <Calendar readOnly showOtherDays value={entries} disableMonthPicker hideWeekDays className="red" />
      </Box>
    </Grid>
  );
}
