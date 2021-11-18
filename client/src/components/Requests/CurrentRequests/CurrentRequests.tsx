import { Paper, Typography, Grid, IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Request from '../../../interface/Request';
import useStyles from './useStyles';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import RequestListing from '../RequestListing/RequestListing';
import RequestMenu from '../RequestMenu/RequestMenu';
import RequestData from '../../../interface/Request';

interface Props {
  requests: RequestData | null | undefined;
}

const CurrentRequests = ({ requests }: Props): JSX.Element => {
  const classes = useStyles();

  if (requests) {
    return (
      <Grid className={classes.root} component={Paper} elevation={2}>
        <Box>
          <Box>
            <Typography className={classes.heading}>current requests:</Typography>
          </Box>
          <Grid className={classes.listing}>
            {requests.after.map((afterRequest, i) => {
              return (
                <Box
                  key={i}
                  width={'440px'}
                  paddingTop={2}
                  marginBottom={1}
                  border="solid 1px rgb(0,0,0,0.2)"
                  borderRadius={10}
                >
                  <RequestListing request={afterRequest} component={'listBooking'}></RequestListing>
                </Box>
              );
            })}
          </Grid>
          <Box>
            <Typography className={classes.heading}>past requests:</Typography>
          </Box>
          <Grid className={classes.listing}>
            {requests.before.map((pastRequest, i) => {
              return (
                <Box
                  key={i}
                  width={'440px'}
                  paddingTop={2}
                  marginBottom={1}
                  border="solid 1px rgb(0,0,0,0.2)"
                  borderRadius={10}
                >
                  <RequestListing request={pastRequest} component={'listBooking'}></RequestListing>
                </Box>
              );
            })}
          </Grid>
        </Box>
      </Grid>
    );
  }
  return <Box component="main"></Box>;
};

export default CurrentRequests;
