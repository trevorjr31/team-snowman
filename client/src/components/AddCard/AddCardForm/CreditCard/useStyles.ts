import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: '33px',
  },
  radio: {
    '& svg': {
      height: '1.4rem',
      width: '1.4rem',
    },
    color: '#cccccc',
  },
  cardText: {
    fontWeight: 700,
  },
  expDate: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  checkedIcon: {
    color: '#ffffff',
    backgroundColor: '#f14140',
    borderRadius: '1.5rem',
  }
}));

export default useStyles;
