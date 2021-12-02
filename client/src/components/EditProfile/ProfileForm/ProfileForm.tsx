import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Formik, FormikHelpers, Field } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress, Switch } from '@material-ui/core';
import DatePicker from '../../DatePicker/DatePicker';
import editProfile from '../../../helpers/APICalls/editProfile';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useAuth } from '../../../context/useAuthContext';

const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  const { loggedInUserProfile } = useAuth();
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
      isSitter,
      defaultPaymentMethod,
    }: {
      firstName: string;
      lastName: string;
      gender: string;
      dateOfBirth: Date;
      phoneNumber: string;
      address: string;
      description: string;
      isSitter: boolean;
      defaultPaymentMethod: string;
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
      isSitter: boolean;
      defaultPaymentMethod: string;
    }>,
  ) => {
    editProfile({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      description,
      isSitter,
      defaultPaymentMethod,
    }).then((data) => {
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
        isSitter: false,
        defaultPaymentMethod: loggedInUserProfile ? loggedInUserProfile.defaultPaymentMethod : '',
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
        <Grid container>
          <Grid item className={classes.title}>
            <Typography variant="h5">Edit Profile</Typography>
          </Grid>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid item className={classes.field}>
              <Grid item className={classes.label}>
                <Typography variant="subtitle1" noWrap>
                  First Name
                </Typography>
              </Grid>
              <TextField
                id="firstName"
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
            </Grid>
            <Grid item className={classes.field}>
              <Grid item className={classes.label}>
                <Typography variant="subtitle1" noWrap>
                  Last Name
                </Typography>
              </Grid>
              <TextField
                id="lastName"
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
            </Grid>
            <Grid item className={classes.field}>
              <Grid item className={classes.label}>
                <Typography variant="subtitle1" noWrap>
                  Gender
                </Typography>
              </Grid>
              <TextField
                id="gender"
                variant="outlined"
                margin="normal"
                select
                name="gender"
                style={{ width: 200 }}
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
            </Grid>
            <Grid item className={classes.field}>
              <Grid item className={classes.label}>
                <Typography variant="subtitle1" noWrap>
                  Birthday
                </Typography>
              </Grid>
              <Field name="dateOfBirth" component={DatePicker} />
            </Grid>
            <Grid item className={classes.field}>
              <Grid item className={classes.label}>
                <Typography variant="subtitle1" noWrap>
                  Phone Number
                </Typography>
              </Grid>
              <TextField
                id="phoneNumber"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  classes: { input: classes.inputs },
                }}
                variant="outlined"
                autoComplete="phone"
                helperText={touched.phoneNumber ? errors.phoneNumber : ''}
                value={values.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item className={classes.field}>
              <Grid item className={classes.label}>
                <Typography variant="subtitle1" noWrap>
                  Address
                </Typography>
              </Grid>
              <TextField
                id="address"
                fullWidth
                margin="normal"
                InputProps={{
                  classes: { input: classes.inputs },
                }}
                variant="outlined"
                autoComplete="address"
                helperText={touched.address ? errors.address : ''}
                value={values.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item className={classes.field}>
              <Grid item className={classes.label}>
                <Typography variant="subtitle1" noWrap>
                  Description
                </Typography>
              </Grid>
              <TextField
                id="description"
                fullWidth
                margin="normal"
                InputProps={{
                  classes: { input: classes.inputs },
                }}
                variant="outlined"
                autoComplete="description"
                helperText={touched.description ? errors.description : ''}
                value={values.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item className={classes.field}>
              <Grid item className={classes.label}>
                <Typography variant="subtitle1" noWrap>
                  Become a sitter?
                </Typography>
              </Grid>
              <Switch checked={values.isSitter} onChange={handleChange} name="isSitter" color="primary" />
            </Grid>
            <Box textAlign="center">
              <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Save'}
              </Button>
            </Box>
          </form>
        </Grid>
      )}
    </Formik>
  );
}
