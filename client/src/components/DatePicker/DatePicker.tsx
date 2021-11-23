import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import useStyles from './useStyles';

export default function MaterialUIPickers() {
  const [value, setValue] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} className={classes.birthday} />}
      />
    </LocalizationProvider>
  );
}
