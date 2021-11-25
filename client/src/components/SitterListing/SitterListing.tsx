import { Box, Typography, Avatar, Paper, Container } from '@material-ui/core';
import useStyles from './useStyles';
import { Profile } from '../../interface/Profile';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';

interface Props {
  profile: Profile;
}

const SitterListing = ({ profile }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Container className={classes.cardMain} component={Paper}>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Avatar variant="square" className={classes.avatar} alt={profile.firstName} src={profile.photo} />
      </Box>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Typography className={classes.name}>{`${profile.firstName} ${profile.lastName}`}</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography className={classes.title}>{profile.title}</Typography>
      </Box>
      <Box display="flex" marginTop={1} justifyContent="center">
        <Rating name="read-only" value={4} readOnly />
      </Box>
      <Box display="flex" height={2} marginTop={2} justifyContent="center">
        <Typography className={classes.description}>{profile.description}</Typography>
      </Box>
      <Divider className={classes.divider} orientation="horizontal" />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" marginLeft={-1}>
          <LocationOnIcon color="primary" />
          <Typography className={classes.address}>{profile.address}</Typography>
        </Box>
        <Typography className={classes.mainText}>{`$${profile.hourlyRate}/hr`}</Typography>
      </Box>
    </Container>
  );
};

export default SitterListing;
