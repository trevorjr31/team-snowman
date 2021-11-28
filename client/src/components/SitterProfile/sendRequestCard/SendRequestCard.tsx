import { Typography, Box, Container, Paper, InputAdornment, TextField, Button } from '@material-ui/core';
import useStyles from './useStyles';
import Rating from '@material-ui/lab/Rating';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useSitters } from '../../../context/useSitterContext';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { useRef } from 'react';

export default function SendRequestCard(): JSX.Element {
  const classes = useStyles();
  const { selectedSitter } = useSitters();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startDatePickerRef = useRef<any | null>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const endDatePickerRef = useRef<any | null>();
  const fields = ['start', 'end'];
  return (
    <Box display="flex">
      <Container className={classes.cardMain} component={Paper}>
        <Box>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Typography className={classes.name}>{`$${selectedSitter?.hourlyRate}/hr`}</Typography>
          </Box>
          <Box display="flex" marginTop={1} marginBottom={2} justifyContent="center">
            <Rating name="read-only" value={4} readOnly />
          </Box>
          <Box>
            {fields.map((field) => {
              return (
                <Box key="field">
                  <Box display="flex" justifyContent="start" marginLeft={9}>
                    <Typography className={classes.fieldLabel}>{field}</Typography>
                  </Box>
                  <Box className={classes.calendar} display="flex" justifyContent="center" marginBottom={3}>
                    <DatePicker
                      multiple={false}
                      //  value={dateRange}
                      className="red"
                      ref={field === 'start' ? startDatePickerRef : endDatePickerRef}
                      format="MMM D YYYY HH:mm A"
                      //onChange={handleDateEntry}
                      render={
                        <TextField
                          variant="outlined"
                          InputProps={{
                            classes: {
                              input: classes.dateSelectText,
                            },
                            startAdornment: (
                              <InputAdornment position="start">
                                <DateRangeIcon className={classes.calendarIcon} />
                              </InputAdornment>
                            ),
                          }}
                          onFocus={() => {
                            field === 'start'
                              ? startDatePickerRef?.current?.openCalendar()
                              : endDatePickerRef?.current?.openCalendar();
                          }}
                        ></TextField>
                      }
                      plugins={[<TimePicker hideSeconds key={'timepicker'} position="bottom" />]}
                    />
                  </Box>
                </Box>
              );
            })}

            <Box display="flex" justifyContent="center">
              <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                send request
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
