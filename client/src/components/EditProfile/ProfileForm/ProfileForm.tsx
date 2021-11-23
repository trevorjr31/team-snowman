import { useState, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers, Field } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import DatePicker from '../../DatePicker/DatePicker';
import editProfile from '../../../helpers/APICalls/editProfile';
import { useSnackBar } from '../../../context/useSnackbarContext';

const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      description,
    }: {
      firstName: string;
      lastName: string;
      gender: string;
      dateOfBirth: Date;
      phoneNumber: string;
      address: string;
      description: string;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      firstName: string;
      lastName: string;
      gender: string;
      dateOfBirth: Date;
      phoneNumber: string;
      address: string;
      description: string;
    }>,
  ) => {
    editProfile({ firstName, lastName, gender, dateOfBirth, phoneNumber, address, description }).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage('Something went wrong');
      } else if (data.success) {
        setSubmitting(false);
        updateSnackBarMessage('Profile Updated');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: new Date(),
        phoneNumber: '',
        address: '',
        description: '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(20, 'Name is too long'),
        lastName: Yup.string().max(20, 'Name is too long'),
        phoneNumber: Yup.string()
          .required('required')
          .matches(phoneRegExp, 'Phone number is not valid')
          .min(10, 'to short')
          .max(10, 'to long'),
      })}
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
          <TextField
            id="phoneNumber"
            label={<Typography className={classes.label}>Phone Number</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            variant="outlined"
            name="phoneNumber"
            helperText={touched.phoneNumber ? errors.phoneNumber : ''}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            value={values.phoneNumber}
            onChange={handleChange}
          />
          <Box>
            <Field name="dateOfBirth" component={DatePicker} />
          </Box>
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
            label={<Typography className={classes.label}>Description</Typography>}
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