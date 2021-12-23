import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import dogs from '../../Images/pets.jpeg';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SitterSearchBar from '../../components/SitterSearchBar/SitterSearchBar';

export default function Landing(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(null);

  const handleSubmit = () => {
    setIsSubmitting(true);
    history.push('/dashboard');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item className={classes.column}>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" minHeight="100%">
          <Box width="100%" maxWidth={450} p={3} marginBottom={10} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h2">
                  Find the care your dog deserves
                </Typography>
              </Grid>
            </Grid>
            <SitterSearchBar />
            <Box>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                size="large"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'find my dog sitter'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item className={classes.column}>
        <img src={dogs} alt="dogs" className={classes.dogs} />
      </Grid>
    </Grid>
  );
}
