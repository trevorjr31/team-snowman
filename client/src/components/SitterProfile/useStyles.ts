import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: '110px',
    width: '110px',
    marginTop: theme.spacing(-6),
    backgroundColor: 'white',
    padding: theme.spacing(1),
    boxShadow: '0px 0px 10px -3px rgba(0,0,0,0.45)',
  },
  mainText: {
    color: 'black',
    fontWeight: 600,
  },
  name: {
    fontWeight: 600,
    textDecoration: 'none',
  },
  about: {
    fontSize: 11,
    color: 'black',
  },
  title: {
    fontWeight: 500,
  },
  address: {
    fontWeight: 500,
    marginTop: theme.spacing(0.3),
  },
  cardMain: {
    height: '600px',
    width: '475px',
    margin: theme.spacing(16, 8),
    padding: theme.spacing(0, 0),
  },
  heroImage: {
    width: 500,
    objectFit: 'cover',
  },
  albumImage: {
    width: 85,
    height: 85,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1),
    objectFit: 'cover',
  },
  heroImageContainer: {
    overflow: 'hidden',
    height: 175,
    width: 500,
  },
}));

export default useStyles;
