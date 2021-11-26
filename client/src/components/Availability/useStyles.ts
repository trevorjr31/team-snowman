import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  week: {
    '& > *': {
      margin: '1em',
    },
    '& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root': {
      color: theme.palette.primary.main,
    },
  },
  weekPicker: {
    flexDirection: 'column',
  },
  dayCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1em',
  },
  day: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    '& > *': {
      margin: '1em',
    },
  },
}));

export default useStyles;
