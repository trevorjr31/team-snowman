import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import CheckIcon from '@material-ui/icons/Check';
import { logos, logosModel } from './logos';
import { theme } from '../../../../themes/theme';

interface Props {
  card: any;
  setValues: (
    values: React.SetStateAction<{
      paymentMethod: string;
    }>,
    shouldValidate?: boolean | undefined,
  ) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  values: {
    paymentMethod: string;
  };
}

const CreditCard = ({ card, setValues, handleSubmit, values }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box padding="20px" marginRight={2} border={2} borderColor="#dddddd" borderRadius={10} width={340} height={190}>
      <Box height="36px" marginBottom={theme.spacing(0.4)} display="flex" justifyContent="space-between">
        <img alt="brand" src={logos[card.card.brand as keyof logosModel]} className={classes.logo} />
        <Radio
          checkedIcon={<CheckIcon className={classes.checkedIcon} />}
          color="primary"
          checked={values.paymentMethod === card.id}
          onChange={(e) => {
            setValues({ paymentMethod: e.target.value });
            handleSubmit();
          }}
          value={card.id}
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'A' }}
          className={classes.radio}
        />
      </Box>
      <Typography variant="subtitle2" className={classes.cardText}>
        {'**** **** **** ' + card.card.last4}
      </Typography>
      <Typography variant="h6" className={classes.expDate}>
        {'Exp. Date ' +
          ('0' + card.card.exp_month.toString()).slice(-2) +
          '/' +
          card.card.exp_year.toString().slice(-2)}
      </Typography>
      <Typography variant="subtitle2" className={classes.cardText}>
        {card.billing_details.name}
      </Typography>
    </Box>
  );
};

export default CreditCard;
