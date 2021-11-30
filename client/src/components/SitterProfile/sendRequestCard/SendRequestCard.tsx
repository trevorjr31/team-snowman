import { Typography, Box, Container, Paper, Button, CircularProgress } from '@material-ui/core';
import useStyles from './useStyles';
import Rating from '@material-ui/lab/Rating';
import { useSitters } from '../../../context/useSitterContext';
import SendRequestDateTimePicker from './SendRequestDateTimePicker/SendRequestDateTimePicker';
import { useRequest } from '../../../context/useRequestContext';
import { useState } from 'react';
import { useSnackBar } from '../../../context/useSnackbarContext';

export default function SendRequestCard(): JSX.Element {
  const classes = useStyles();
  const { selectedSitter } = useSitters();
  const { updateSnackBarMessage } = useSnackBar();
  const { sendARequest, requestedStart, requestedEnd } = useRequest();
  const [isSubmitting, setIsSubmitting] = useState<boolean | null | undefined>(null);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!requestedStart || !requestedEnd) {
      updateSnackBarMessage('Please select dates');
      setIsSubmitting(false);
      return false;
    }
    try {
      await sendARequest(selectedSitter);
      setIsSubmitting(false);
      updateSnackBarMessage('Request Sent');
    } catch (err) {
      updateSnackBarMessage('An error occured');
      setIsSubmitting(false);
    }
  };

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
            <Box display="flex" justifyContent="start" marginLeft={9}>
              <Typography className={classes.fieldLabel}>start</Typography>
            </Box>
            <Box>
              <SendRequestDateTimePicker type={'start'} />
              <SendRequestDateTimePicker type={'end'} />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={handleSubmit}
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSubmitting ? (
                <CircularProgress />
              ) : (
                <Typography className={classes.submitText}>send request</Typography>
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
