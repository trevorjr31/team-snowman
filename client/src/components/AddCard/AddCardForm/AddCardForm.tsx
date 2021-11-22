import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import CheckIcon from '@material-ui/icons/Check';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import { CircularProgress } from '@material-ui/core';
import { addCard } from '../../../helpers/APICalls/addCard';
import { getAllPaymentMethods } from '../../../helpers/APICalls/getAllPaymentMethods';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useHistory } from 'react-router-dom';

interface Props {
  handleSubmit: (
    {
      paymentMethod,
    }: {
      paymentMethod: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      paymentMethod: string;
    }>,
  ) => void;
}

export default function AddCard({ handleSubmit }: Props): JSX.Element {
  const [paymentMethods, setPaymentMethods] = useState<any>([{}]);
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();

  useEffect(() => {
    if (loggedInUser != undefined && loggedInUser) {
      getAllPaymentMethods({ userId: loggedInUser.id }).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.allPaymentMethods) {
          console.log(data.allPaymentMethods);
          setPaymentMethods(data.allPaymentMethods);
        } else {
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  }, [loggedInUser, updateSnackBarMessage]);

  const handleAddCard = () => {
    if (loggedInUser != undefined && loggedInUser) {
      addCard({ userId: loggedInUser.id }).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.customer) {
          history.push({
            pathname: '/add-card-info',
            state: {
              clientSecret: data.intent.client_secret,
            },
          });
        } else {
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  };
  const classes = useStyles();

  if (process.env.REACT_APP_PRICE_ID != undefined) {
    return (
      <Formik
        initialValues={{
          paymentMethod: 'visacard',
        }}
        validationSchema={Yup.object().shape({
          paymentMethod: Yup.string().required('PaymentMethod is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setValues, values, touched, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Box width="100%" display="flex" flexDirection="column" alignItems="center">
              <Box maxWidth="85%">
                <Typography component="h4" variant="h6" className={classes.smallTitle}>
                  saved payment profiles:
                </Typography>
                <Grid container>
                  <Box marginRight={2} border={2} borderColor="#dddddd" borderRadius={10} width={340} height={190}>
                    <Radio
                      checkedIcon={
                        <CheckIcon style={{ color: '#ffffff', backgroundColor: '#f14140', borderRadius: 10 }} />
                      }
                      color="primary"
                      checked={values.paymentMethod === 'mastercard'}
                      onChange={(e) => {
                        setValues({ paymentMethod: e.target.value });
                        handleSubmit();
                      }}
                      value="mastercard"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'A' }}
                    />
                  </Box>
                  <Box marginRight={2} border={2} borderColor="#dddddd" borderRadius={10} width={340} height={190}>
                    <Radio
                      checkedIcon={
                        <CheckIcon style={{ color: '#ffffff', backgroundColor: '#f14140', borderRadius: 10 }} />
                      }
                      checked={values.paymentMethod === 'visacard'}
                      onChange={(e) => {
                        setValues({ paymentMethod: e.target.value });
                        handleSubmit();
                      }}
                      value="visacard"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'A' }}
                    />
                  </Box>
                </Grid>
                <Box textAlign="flex-start">
                  <Button
                    onClick={handleAddCard}
                    size="large"
                    variant="outlined"
                    color="primary"
                    className={classes.submit}
                  >
                    {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Add new payment profile'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    );
  } else {
    return <Typography>No valid Price Id</Typography>;
  }
}
