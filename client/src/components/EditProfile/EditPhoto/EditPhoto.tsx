import { Box, TextField, Grid, Button, IconButton, Avatar, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { uploadImage } from '../../../helpers/APICalls/uploadImage';
import editProfile from '../../../helpers/APICalls/editProfile';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';

export default function EditPhoto(): JSX.Element {
  const { loggedInUserProfile, fetchProfileAndUpdateContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const classes = useStyles();

  const handleCapture = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const files = target.files;
    if (files) {
      uploadImage({ file: files[0] })
        .then(() => {
          fetchProfileAndUpdateContext();
          updateSnackBarMessage('Your photo is uploaded successfully');
        })
        .catch(() => ({
          error: { message: 'Unable to connect to server. Please try again' },
        }));
    }
  };

  async function removeFile() {
    const profile = loggedInUserProfile;
    if (profile) {
      profile.photo = '';
      try {
        await editProfile(profile);
      } catch (err) {
        updateSnackBarMessage('Unable to connect to server. Please try again');
      }
      fetchProfileAndUpdateContext();
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        flexDirection="column"
        minHeight="100%"
        paddingBottom={40}
      >
        <Box width="100%" maxWidth={450} p={3} alignSelf="center">
          <Grid container>
            <Grid item xs>
              <Typography className={classes.title} component="h1" variant="h5">
                Profile Photo
              </Typography>
            </Grid>
          </Grid>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Avatar src={loggedInUserProfile?.photo} className={classes.avatar} />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography className={classes.reminder} component="h4" variant="h6">
              Be sure to use a photo that clearly shows your face
            </Typography>
          </Box>
          <Box className={classes.centerRow}>
            <Button component="label" className={classes.uploadButton} variant="outlined" color="primary">
              Upload a file from your device
              <input
                style={{ display: 'none' }}
                type="file"
                accept="image/png, image/jpeg"
                id="load-photo-button"
                onChange={handleCapture}
                hidden
              />
            </Button>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" onClick={removeFile}>
            <IconButton aria-label="delete" size="small">
              <DeleteSharpIcon className={classes.deleteIcon} />
              <Typography className={classes.deleteText} component="h4" variant="h6">
                Delete photo
              </Typography>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
