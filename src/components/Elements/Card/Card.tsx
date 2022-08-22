import React from 'react';
import classes from './Card.module.scss';
import Chip from '../../../assets/Chip.png';
import PayPass from '../../../assets/PayPass.png';
// @ts-ignore
import { formatCreditCardNumber, formatDate } from '../../../utils/index.ts';
import { Expiry } from '../../../utils';

interface CardProps {
  cardNumber: string | null;
  name: string | null;
  expiry: Expiry;
}

const Card = (props: CardProps): JSX.Element => {
  return (
    <div className={classes.card}>
      <div className={classes.bank}>World Bank</div>
      <div className={classes.images}>
        <img src={Chip} alt="Chip" />
        <img src={PayPass} alt="PayPass" />
      </div>
      <h1 className={classes.cardNumber}>
        {formatCreditCardNumber(props.cardNumber || '1234567891234567')}
      </h1>
      <div className={classes.datesContainer}>
        <span className={classes.datesTitle}>
          CARDMEMBER <br />
          SINCE
        </span>
        <span className={classes.dates}>
          {parseInt(props.expiry.year) - 5 || 2022}
        </span>
        <span className={classes.datesTitle}>
          GOOD <br />
          THRU
        </span>
        <span className={classes.dates}>{`${formatDate(props.expiry)}`}</span>
      </div>
      <div className={classes.cardHolder}>{props.name || 'F. Last'}</div>
    </div>
  );
};

export default Card;
