import { Grid, Typography, Box } from '@material-ui/core';
import useStyles from './useStyles';
import { useSitters } from '../../context/useSitterContext';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { sitterProfiles } = useSitters();
  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      {sitterProfiles?.map((profile) => {
        return (
          <Box key={profile._id}>
            <Typography>{`First Name: ${profile.firstName}`}</Typography>
            <Typography>{`Last Name: ${profile.lastName}`}</Typography>
            <Typography>{`Title: ${profile.title}`}</Typography>
            <Typography>{`Description: ${profile.description}`}</Typography>
            <Typography>{`Address: ${profile.address}`}</Typography>
            <Typography>{`Rate: ${profile.hourlyRate}`}</Typography>
            <Typography>{`Photo: ${profile.photo}`}</Typography>
          </Box>
        );
      })}
    </Grid>
  );
}
