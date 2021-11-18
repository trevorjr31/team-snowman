import { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { FieldProps } from 'formik';

export default function MaterialUIPickers({ field, form, ...others }: FieldProps) {
  const [value, setValue] = useState<Date | null>(new Date('2014-08-18T21:11:54'));
  console.log(form);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Birthday"
        inputFormat="MM/dd/yyyy"
        value={form.values.dateOfBirth}
        onChange={(date: Date | null) => {
          form.setFieldValue('dateOfBirth', date);
        }}
        renderInput={(params) => <TextField {...params} name={field.name} id={field.name} margin="normal" />}
      />
    </LocalizationProvider>
  );
}
