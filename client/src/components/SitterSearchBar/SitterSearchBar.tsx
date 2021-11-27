import { Box, TextField, InputAdornment, IconButton, Divider } from '@material-ui/core';
import useStyles from './useStyles';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DatePicker, { getAllDatesInRange } from 'react-multi-date-picker';
import { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import DateObject from 'react-date-object';
import ClearIcon from '@material-ui/icons/Clear';
import { useSitters } from '../../context/useSitterContext';

export default function SitterSearchBar(): JSX.Element {
  const classes = useStyles();
  const { updateSearch } = useSitters();

  const [dateRange, setDateRange] = useState<DateObject[] | null>(null);
  const [citySearchText, setCitySearchText] = useState<string | null>('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateSearch(event.target.value, dateRange);
    setCitySearchText(event.target.value);
  };

  const handleDateClear = (event: MouseEvent) => {
    setDateRange(null);
    updateSearch(citySearchText, null);
  };

  const handleDateEntry = (newDateRange: DateObject[]) => {
    const updatedDateRange = getAllDatesInRange(newDateRange);

    const dateObjects = [];
    for (const i of updatedDateRange) {
      dateObjects.push(new DateObject(i));
    }
    if (newDateRange) {
      setDateRange(dateObjects);
      updateSearch(citySearchText, dateObjects);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const datePickerRef = useRef<any | null>();

  function DateRangeInputDisplay() {
    const from = dateRange ? dateRange[0] : '';
    const to = dateRange ? dateRange[dateRange.length - 1] : '';
    const input = from && to ? `${from.day}-${to.day} ${from.month.shortName} ${from.year}` : from ? `${from}` : '';
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
            <InputAdornment className={`${classes.dateIcon} ${classes.clear}`} position="start">
              <IconButton>
                <ClearIcon onClick={handleDateClear} color="inherit" />
              </IconButton>
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
        value={citySearchText}
        onChange={(event) => handleSearch(event)}
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
                  value={dateRange}
                  className="red"
                  ref={datePickerRef}
                  format="MMM D YYYY"
                  range
                  onChange={handleDateEntry}
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
