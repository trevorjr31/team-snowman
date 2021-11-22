import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import DatePicker from '../../DatePicker/DatePicker';

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
        <Grid container>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid item className={classes.field}>
              <Grid className={classes.label}>
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
              <Grid className={classes.label}>
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
              <Grid className={classes.label}>
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
              <Grid className={classes.label}>
                <Typography variant="subtitle1" noWrap>
                  Birthday
                </Typography>
              </Grid>
              <DatePicker />
            </Grid>
            <Grid item className={classes.field}>
              <Grid className={classes.label}>
                <Typography variant="subtitle1" noWrap>
                  Email
                </Typography>
              </Grid>
              <TextField
                id="email"
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
            </Grid>
            <Grid item className={classes.field}>
              <Grid className={classes.label}>
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
              <Grid className={classes.label}>
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
