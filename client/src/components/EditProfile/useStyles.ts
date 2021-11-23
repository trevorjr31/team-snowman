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
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap',
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
    flexGrow: 2,
    marginTop: 80,
    height: '600px',
    overflow: 'auto',
  },
  tabComponentHolder: {
    overflow: 'auto',
  },
}));

export default useStyles;
