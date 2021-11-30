import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appbar: {
    maxHeight: 100,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
  },
  landingPageBar: {
    maxHeight: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  link: { textDecoration: 'none' },
}));

export default useStyles;
