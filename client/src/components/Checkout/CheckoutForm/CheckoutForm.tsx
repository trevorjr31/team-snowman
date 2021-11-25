import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';

interface Props {
  handleSubmit: (
    {
      priceId,
      quantity,
    }: {
      priceId: string;
      quantity: number;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      priceId: string;
      quantity: number;
    }>,
  ) => void;
}

export default function Checkout({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  if (process.env.REACT_APP_PRICE_ID != undefined) {
    return (
      <Formik
        initialValues={{
          priceId: process.env.REACT_APP_PRICE_ID,
          quantity: 1,
        }}
        validationSchema={Yup.object().shape({
          priceId: Yup.string().required('"priceId" is required'),
          quantity: Yup.number()
            .required('Quantity is required')
            .max(100, 'Quantity is too large')
            .min(1, 'Quantity is too small'),
        })}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              id="quantity"
              label={<Typography className={classes.label}>Quantity</Typography>}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                classes: { input: classes.inputs },
                endAdornment: <Typography className={classes.forgot}>Input an integer</Typography>,
              }}
              variant="outlined"
              type="quantity"
              helperText={touched.quantity ? errors.quantity : ''}
              error={touched.quantity && Boolean(errors.quantity)}
              value={values.quantity}
              onChange={handleChange}
            />
            <Box textAlign="center">
              <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Checkout'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    );
  } else {
    return <Typography>No valid Price Id</Typography>;
  }
}
