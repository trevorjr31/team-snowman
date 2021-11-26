import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import Typography from '@material-ui/core/Typography';
import { useSnackBar } from '../../../context/useSnackbarContext';
import editAvailability from '../../../helpers/APICalls/editAvailability';

export default function ResponsiveTimePickers(date: Date): JSX.Element {
  const [start, setStart] = useState<Date | null>(date.date.setHours(10));
  const [end, setEnd] = useState<Date | null>(date.date.setHours(22));
  const [changed, setChanged] = useState<boolean>(false);

  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    if (!changed) {
      return;
    }
    if (start >= end) {
      updateSnackBarMessage('Start time must be before end time');
      return;
    }
    editAvailability({ date, start, end }).then((data) => {
      if (data.error) {
        updateSnackBarMessage('Something went wrong');
      } else if (data.success) {
        updateSnackBarMessage('Availability Updated!');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  }, [changed, start, end, date, updateSnackBarMessage]);

  const handleStart = (value: Date) => {
    setStart(value);
    setChanged(true);
  };

  const handleEnd = (value: Date) => {
    setEnd(value);
    setChanged(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Typography variant="subtitle1">From</Typography>
      <TimePicker
        value={start}
        onChange={handleStart}
        views={['hours']}
        renderInput={(params) => <TextField {...params} />}
      />
      <Typography variant="subtitle1">To</Typography>
      <TimePicker
        value={end}
        onChange={handleEnd}
        views={['hours']}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
