import Box from '@material-ui/core/Box';
import NextRequest from './NextRequest/NextRequest';
import { useRequest } from '../../context/useRequestContext';
import CurrentRequests from './CurrentRequests/CurrentRequests';
import RequestCalendar from './RequestCaldendar/RequestCalendar';
import { Paper, Typography, Grid } from '@material-ui/core';

export default function Requests(): JSX.Element {
  const { requests } = useRequest();

  if (requests) {
    return (
      <Box component="main" display="flex">
        <Box>
          <NextRequest request={requests?.nextRequest} />
          <CurrentRequests requests={requests} />
        </Box>
        <Box>
          <RequestCalendar />
        </Box>
      </Box>
    );
  }
  return (
    <Grid container component={Paper} elevation={2}>
      <Typography>no active requests</Typography>
    </Grid>
  );
}
