import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  accAside: {
    textDecoration: 'underline',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginRight: 35,
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 40,
    '& > *': {
      margin: 10,
    },
  },
  link: { textDecoration: 'none' },
}));

export default useStyles;
