import { Paper, Typography, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Request from '../../../interface/Request';
import useStyles from './useStyles';
import RequestListing from '../RequestListing/RequestListing';
import RequestMenu from '../RequestMenu/RequestMenu';

interface Props {
  request: Request | null | undefined;
}

const NextRequest = ({ request }: Props): JSX.Element => {
  const classes = useStyles();

  if (request) {
    return (
      <Grid item className={classes.root} component={Paper} elevation={2}>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography className={classes.heading}>your next booking:</Typography>
            <RequestMenu request={request} />
          </Box>
          <Grid item className={classes.listing}>
            <RequestListing request={request} component={'nextBooking'}></RequestListing>
          </Grid>
        </Box>
      </Grid>
    );
  }
  return (
    <Grid container className={classes.root} component={Paper} elevation={2}>
      <Box display="flex" marginLeft={-5} paddingBottom={7} padding={5} justifyContent="center">
        <Typography className={classes.heading}>you have no upcoming jobs</Typography>
      </Box>
    </Grid>
  );
};

export default NextRequest;
