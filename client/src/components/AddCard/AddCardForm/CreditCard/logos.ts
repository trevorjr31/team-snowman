import visa from '../../../../Images/visa-logo.png';
import mastercard from '../../../../Images/mastercard-logo.png';
import dinersClub from '../../../../Images/diners-club-logo.png';
import discover from '../../../../Images/discover-logo.png';
import jcb from '../../../../Images/jcb-logo.png';
import unionPay from '../../../../Images/union-pay-logo.png';
import amex from '../../../../Images/american-express-logo.png';

export interface logosModel {
  visa: string;
  mastercard: string;
  diners_club: string;
  discover: string;
  jcb: string;
  unionpay: string;
  amex: string;
}

export const logos: logosModel = {
  visa: visa,
  mastercard: mastercard,
  diners_club: dinersClub,
  discover: discover,
  jcb: jcb,
  unionpay: unionPay,
  amex: amex,
};
