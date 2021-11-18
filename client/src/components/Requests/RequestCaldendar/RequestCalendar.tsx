import Box from '@material-ui/core/Box';
import { useRequest } from '../../../context/useRequestContext';
import { Grid, Paper } from '@material-ui/core';
import useStyles from './useStyles';
import { Calendar } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/red.css';
import { useState } from 'react';
export default function RequestCalendar(): JSX.Element {
  const classes = useStyles();
  const { requests } = useRequest();
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);
  const [values, setValues] = useState([today, tomorrow]);
  if (requests) {
    const allRequests = [...requests.before, ...requests.after, requests.nextRequest];
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
  return <Box></Box>;
}
