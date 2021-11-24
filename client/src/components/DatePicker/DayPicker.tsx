import Grid from '@material-ui/core/Grid';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { FieldProps } from 'formik';
import useStyles from './useStyles';

export default function MaterialUIPickers({ field, form, ...others }: FieldProps) {
  const classes = useStyles();
  return (
    <Grid container className={classes.birthday}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          inputFormat="MM/dd/yyyy"
          value={form.values.dateOfBirth}
          onChange={(date: Date | null) => {
            form.setFieldValue('dateOfBirth', date);
          }}
          renderInput={(params) => <TextField {...params} name={field.name} id={field.name} />}
        />
      </LocalizationProvider>
    </Grid>
  );
}
