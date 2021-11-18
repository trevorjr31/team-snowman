import { useState, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import DatePicker from '../../DatePicker/DatePicker';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
}

const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  const handleSubmit = () => {
    return;
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        address: '',
        description: '',
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            id="firstName"
            label={<Typography className={classes.label}>First Name</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            variant="outlined"
            name="firstName"
            autoComplete="first-name"
            autoFocus
            helperText={touched.firstName ? errors.firstName : ''}
            error={touched.firstName && Boolean(errors.firstName)}
            value={values.firstName}
            onChange={handleChange}
          />
          <TextField
            id="lastName"
            label={<Typography className={classes.label}>Last Name</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            variant="outlined"
            autoComplete="lastName"
            helperText={touched.lastName ? errors.lastName : ''}
            value={values.lastName}
            onChange={handleChange}
          />
          <TextField
            id="gender"
            variant="outlined"
            margin="normal"
            select
            name="gender"
            style={{ width: 200 }}
            label={<Typography className={classes.label}>Gender</Typography>}
            value={values.gender}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box>
            <DatePicker />
          </Box>
          <TextField
            id="email"
            label={<Typography className={classes.label}>Email</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            variant="outlined"
            autoComplete="email"
            helperText={touched.email ? errors.email : ''}
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            id="address"
            label={<Typography className={classes.label}>Address</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            variant="outlined"
            autoComplete="address"
            helperText={touched.address ? errors.address : ''}
            value={values.address}
            onChange={handleChange}
          />
          <TextField
            id="description"
            label={<Typography className={classes.label}>Email</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            variant="outlined"
            autoComplete="description"
            helperText={touched.description ? errors.description : ''}
            value={values.description}
            onChange={handleChange}
          />

          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Save'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
