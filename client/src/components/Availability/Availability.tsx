import { ComponentType, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PickersDay, { PickersDayProps } from '@mui/lab/PickersDay';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import format from 'date-fns/format';
import { addDays, addMonths, differenceInDays, differenceInMonths } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from './useStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TimePicker from './TimePicker/TimePicker';

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as ComponentType<CustomPickerDayProps>;

function dateRange(startDate: Date, endDate: Date) {
  const days = differenceInDays(endDate, startDate);

  return [...Array(days + 1).keys()].map((i) => addDays(startDate, i));
}

export default function CustomDay() {
  const [value, setValue] = useState<Date | null>(new Date());
  const [timeValue, setTimeValue] = useState<Date | null>(new Date('2018-01-01T00:00:00.000Z'));

  const [dates, setDates] = useState<Array<Date | Null>>([]);

  useEffect(() => {
    if (value) {
      const start = startOfWeek(value);
      const end = endOfWeek(value);
      setDates(dateRange(start, end));
    }
  }, [value]);

  const classes = useStyles();

  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>,
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }
    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <Grid container className={classes.weekPicker}>
      <Typography variant="h4">Your availability</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderDay={renderWeekPickerDay}
          renderInput={({ inputRef, inputProps, InputProps }) => {
            return (
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                className={classes.week}
                ref={inputRef}
              >
                {InputProps?.endAdornment}
                <Typography variant="body2">
                  {format(startOfWeek(value), 'MMM d') + ' to ' + format(endOfWeek(value), 'MMM d')}
                </Typography>
              </Box>
            );
          }}
        />
      </LocalizationProvider>
      {dates.map((date) => (
        <Card key={date} variant="outlined">
          <Grid item className={classes.dayCard}>
            <Grid item className={classes.day}>
              <Typography variant="body2">{format(date, 'd MMM') + ','}</Typography>
              <Typography variant="subtitle2">{format(date, ' EEEE')}</Typography>
            </Grid>
            <Grid item className={classes.time} key={date}>
              <TimePicker date={date} />
            </Grid>
          </Grid>
        </Card>
      ))}
    </Grid>
  );
}
