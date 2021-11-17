import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';

export default function EditPhoto(): JSX.Element {
  const [file, setFile] = useState<string>('');

  const classes = useStyles();

  function importData() {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    input.onchange = () => {
      const files = input.files;
      setFile(files === null ? '' : URL.createObjectURL(files[0]));
    };
    input.click();
  }

  function removeFile() {
    setFile('');
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={7} elevation={4} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.title} component="h1" variant="h5">
                  Profile Photo
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.centerRow}>
              <Avatar src={file} className={classes.avatar} />
            </Grid>
            <Grid className={classes.centerRow}>
              <Typography className={classes.reminder} component="h4" variant="h6">
                Be sure to use a photo that clearly shows your face
              </Typography>
            </Grid>
            <Grid className={classes.centerRow}>
              <Button className={classes.uploadButton} variant="outlined" color="primary" onClick={importData}>
                Upload a file from your device
              </Button>
            </Grid>
            <Grid className={classes.centerRow} onClick={removeFile}>
              <DeleteSharpIcon className={classes.deleteIcon} />
              <Typography className={classes.deleteText} component="h4" variant="h6">
                Delete photo
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
