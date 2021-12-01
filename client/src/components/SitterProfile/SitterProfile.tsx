import { Typography, Box, Avatar, Paper } from '@material-ui/core';
import useStyles from './useStyles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useSitters } from '../../context/useSitterContext';
import SendRequestCard from './sendRequestCard/SendRequestCard';

export default function SitterProfile(): JSX.Element {
  const classes = useStyles();
  const { selectedSitter } = useSitters();
  return (
    <Box display="flex" justifyContent="center">
      <Box className={classes.cardMain} component={Paper}>
        <Box>
          <Box display="flex" justifyContent="center">
            <Box display="flex" justifyContent="center" className={classes.heroImageContainer}>
              <img className={classes.heroImage} alt="pet sitter hero image" src={selectedSitter?.heroImage}></img>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Avatar className={classes.avatar} alt={selectedSitter?.firstName} src={selectedSitter?.photo} />
          </Box>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Typography
              variant="h3"
              className={classes.name}
            >{`${selectedSitter?.firstName} ${selectedSitter?.lastName}`}</Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography variant="h6" className={classes.title}>
              {selectedSitter?.title}
            </Typography>
          </Box>
          <Box display="flex" marginTop={1} justifyContent="center">
            <LocationOnIcon color="primary" />
            <Typography variant="h6" className={classes.address}>
              {selectedSitter?.address}
            </Typography>
          </Box>
          <Box height={2} marginTop={-1} padding={3} justifyContent="start">
            <Typography variant="body2">About me</Typography>
            <Box marginTop={1}>
              <Typography className={classes.about}>{selectedSitter?.about}</Typography>
            </Box>
            <Box marginTop={1}>
              {selectedSitter?.album?.map((photo) => {
                return <img alt="pet sitter album image" className={classes.albumImage} key={photo} src={photo} />;
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <SendRequestCard />
    </Box>
  );
}
