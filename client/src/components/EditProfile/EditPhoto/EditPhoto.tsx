import { useState } from 'react';
import { Paper, Box, Grid, Button, IconButton, Avatar, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { uploadImage } from '../../../helpers/APICalls/uploadImage';

export default function EditPhoto(): JSX.Element {
  const [file, setFile] = useState<string>('');

  const classes = useStyles();

  const handleCapture = ({ target }: any) => {
    const files = target.files;
    if (files) {
      setFile(URL.createObjectURL(files[0]));
      uploadImage({ file: files[0] })
        .then()
        .catch(() => ({
          error: { message: 'Unable to connect to server. Please try again' },
        }));
    }
  };

  function removeFile() {
    setFile('');
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={7} elevation={4} component={Paper} square className={classes.paper}>
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
            <Box className={classes.centerRow}>
              <Avatar src={file} className={classes.avatar} />
            </Box>
            <Box className={classes.centerRow}>
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
            <Box className={classes.centerRow} onClick={removeFile}>
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
    </Grid>
  );
}
