import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

interface Props {
  handleSubmit: (
    {
      address,
      startDate,
      endDate,
    }: {
      address: string;
      startDate: Date;
      endDate: Date;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      address: string;
      startDate: Date;
      endDate: Date;
    }>,
  ) => void;
}

export default function FindSitter({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        address: '',
        startDate: new Date(),
        endDate: new Date(),
      }}
      validationSchema={Yup.object().shape({
        address: Yup.string().required('Address is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting, setFieldValue }) => {
        return (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Box paddingBottom="30px">
              <Typography className={classes.label} variant="subtitle2">
                where
              </Typography>
              <TextField
                id="address"
                fullWidth
                margin="none"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  classes: { input: classes.inputs },
                }}
                variant="outlined"
                name="address"
                autoComplete="address"
                autoFocus
                placeholder="Anywhere"
                helperText={touched.address ? errors.address : ''}
                error={touched.address && Boolean(errors.address)}
                value={values.address}
                onChange={handleChange}
              />
            </Box>
            <Typography className={classes.label} variant="subtitle2">
              drop in / drop off
            </Typography>
            <Box display="flex" height="80px">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  clearable
                  inputVariant="outlined"
                  value={values.startDate}
                  placeholder="mm/dd/yyyy"
                  minDate={new Date()}
                  name="startDate"
                  onChange={(date) => {
                    setFieldValue('startDate', date);
                  }}
                  format="MM/dd/yyyy"
                  InputProps={{
                    style: {
                      fontSize: 18,
                      height: 70,
                    },
                  }}
                />
                <KeyboardDatePicker
                  clearable
                  inputVariant="outlined"
                  value={values.endDate}
                  placeholder="mm/dd/yyyy"
                  minDate={values.startDate === null ? new Date() : values.startDate}
                  name="endDate"
                  onChange={(date) => {
                    setFieldValue('endDate', date);
                  }}
                  format="MM/dd/yyyy"
                  InputProps={{
                    style: {
                      fontSize: 18,
                      height: 70,
                    },
                  }}
                />
              </MuiPickersUtilsProvider>
            </Box>
            <Box>
              <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'find my dog sitter'}
              </Button>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
}
