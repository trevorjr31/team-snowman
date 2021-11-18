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
  tabContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 224,
  },
  tabs: {
    borderRight: 1,
    borderColor: 'divider',
  },
  tabComponents: {
    marginTop: 60,
    height: '600px',
    overflow: 'auto',
    maxWidth: 600,
    width: '100%',
  },
}));

export default useStyles;
