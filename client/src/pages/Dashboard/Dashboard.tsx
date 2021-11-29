import { Grid, Typography, Box } from '@material-ui/core';
import useStyles from './useStyles';
import { useSitters } from '../../context/useSitterContext';
import SitterSearchBar from '../../components/SitterSearchBar/SitterSearchBar';
import SitterListing from '../../components/SitterListing/SitterListing';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { sitterSearchResults } = useSitters();
  return (
    <Box justifyContent="center" className={`${classes.root}`}>
      <Box display="flex" flexDirection="column" alignItems="center" width="100vw">
        <Typography className={classes.title}>your search results</Typography>
        <SitterSearchBar />
      </Box>
      <Grid container component="main">
        {sitterSearchResults &&
          sitterSearchResults[0] &&
          sitterSearchResults?.map((profile) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} key={profile._id}>
                <SitterListing profile={profile} />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
