import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import NextRequest from './NextRequest/NextRequest';
import { useRequest } from '../../context/useRequestContext';
import CurrentRequests from './CurrentRequests/CurrentRequests';
import RequestCalendar from './RequestCaldendar/RequestCalendar';
import { Paper, Typography, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';

export default function Requests(): JSX.Element {
  const { requests } = useRequest();
  const [showComponent, setShowComponent] = useState<boolean>(false);

  useEffect(() => {
    setShowComponent(true);
  }, [setShowComponent]);

  if (requests) {
    return (
      <Box component="main" display="flex">
        <Slide direction="down" in={showComponent} timeout={2000} mountOnEnter unmountOnExit>
          <Box>
            <NextRequest request={requests?.nextRequest} />
            <CurrentRequests requests={requests} />
          </Box>
        </Slide>
        <Slide direction="up" in={showComponent} timeout={2000} mountOnEnter unmountOnExit>
          <Box>
            <RequestCalendar />
          </Box>
        </Slide>
      </Box>
    );
  }
  return (
    <Grid container component={Paper} elevation={2}>
      <Typography>no active requests</Typography>
    </Grid>
  );
}
