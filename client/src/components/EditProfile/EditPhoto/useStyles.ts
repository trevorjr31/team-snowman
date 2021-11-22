import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100%',
    paddingBottom: 40,
  },
  title: {
    padding: 40,
  },
  reminder: {
    padding: 20,
    width: '16vw',
  },
  centerRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 10,
    width: 140,
    height: 140,
    alignSelf: 'center',
  },
  uploadButton: {
    textTransform: 'none',
    fontSize: 12,
    fontWeight: 700,
    padding: '12px 30px 12px 30px',
    margin: '18px 0px 18px 0px',
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  deleteText: {
    margin: 10,
  },
}));

export default useStyles;
