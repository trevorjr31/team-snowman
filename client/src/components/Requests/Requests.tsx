import Box from '@material-ui/core/Box';
import NextRequest from './NextRequest/NextRequest';
import { useRequest } from '../../context/useRequestContext';
import CurrentRequests from './CurrentRequests/CurrentRequests';
import RequestCalendar from './RequestCaldendar/RequestCalendar';

export default function Requests(): JSX.Element {
  const { requests } = useRequest();

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
