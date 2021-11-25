import { Box, TextField, InputAdornment } from '@material-ui/core';
import useStyles from './useStyles';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Divider from '@material-ui/core/Divider';
import DatePicker from 'react-multi-date-picker';
import { useState, useRef } from 'react';
import DateObject from 'react-date-object';
import ClearIcon from '@material-ui/icons/Clear';

export default function SitterSearchBar(): JSX.Element {
  const classes = useStyles();

  const [dateRange, setdateRange] = useState<DateObject[] | null>(null);

  function handleChange(newdateRange: DateObject[] | null) {
    setdateRange(newdateRange);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const datePickerRef = useRef<any | null>();

  function DateRangeInputDisplay() {
    const from = dateRange ? dateRange[0] : '';
    const to = dateRange ? dateRange[1] : '';

    const input = from && to ? `${from.day}-${to.day} ${from.month.shortName} ${from.year}` : `${from}`;

    return (
      <TextField
        value={input}
        className={classes.dateSelector}
        placeholder="Select dates"
        InputProps={{
          classes: {
            input: classes.searchBarText,
          },
          startAdornment: (
            <InputAdornment className={classes.dateIcon} position="start">
              <DateRangeIcon color="inherit" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment className={classes.dateIcon} position="start">
              <ClearIcon color="inherit" />
            </InputAdornment>
          ),
        }}
        onFocus={() => {
          datePickerRef?.current?.openCalendar();
        }}
      ></TextField>
    );
  }

  return (
    <Box component="main" marginBottom={8} display="flex">
      <TextField
        className={classes.searchBar}
        InputProps={{
          classes: {
            input: classes.searchBarText,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Divider className={classes.divider} orientation="vertical" />
              <Box className={classes.calendar}>
                <DatePicker
                  className="red"
                  ref={datePickerRef}
                  format="MMM D YYYY"
                  range
                  onChange={handleChange}
                  render={<DateRangeInputDisplay />}
                />
              </Box>
            </InputAdornment>
          ),
        }}
        id="outlined-basic"
        variant="outlined"
        placeholder="Search by city"
      />
    </Box>
  );
}
