import React from 'react';
import { Expiry } from '../../../utils';
// @ts-ignore
import Card from '../Card/Card.tsx';
import classes from './Form.module.scss';
// @ts-ignore
import { numericRegex } from '../../../utils/index.ts';

interface SyntheticEvent {
  preventDefault: () => void;
}

const defaultExpiry = {
  month: '8',
  year: '2025',
};

const CreditCardForm = (): JSX.Element => {
  const [cardNumber, setCardNumber] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');

  const [expiry, setExpiry] = React.useState<Expiry>(defaultExpiry);
  const [cvv, setCvv] = React.useState<string>('');
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<String>();

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    validation();
  };

  const validation = () => {
    if (cardNumber.length < 16) {
      setError(`Please Enter 16 digits of card numbers.`);
    } else if (
      !numericRegex.test(expiry.month) ||
      parseInt(expiry.month) > 12
    ) {
      setError(`Please Enter Correct Month.`);
    } else if (!numericRegex.test(expiry.year)) {
      setError(`Please Enter Correct Year.`);
    } else if (
      new Date(parseInt(expiry.year), parseInt(expiry.month)) < new Date()
    ) {
      setError(`Your Card Has Expired.`);
    } else if (cvv.length < 3) {
      setError('Please Enter 3 or 4 Digits of CVV.');
    } else {
      setSuccess(true);
      setError('');
    }
  };

  return (
    <div className={classes.layout}>
      <Card cardNumber={cardNumber} name={name} expiry={expiry} />
      <div
        style={{
          marginLeft: '1rem',
          width: '40rem',
        }}
      >
        <h1 className={classes.title} style={{ fontFamily: 'ibm-plex-sans,sans-serif' }}>Enter Card Detail</h1>
        {error ? <div className={classes.error}>{error}</div> : null}
        {success && !error ? (
          <div className={classes.success}>Your card has been confirmed!</div>
        ) : null}
        <form onSubmit={submitHandler} style={{ padding: '0 1rem' }}>
          <label htmlFor="cardHolderName" className={classes.label}>
            CARDHOLDER NAME
            <div>
              <input
                id="cardHolderName"
                type="text"
                placeholder="e.g.John Adam"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </label>
          <label htmlFor="cardHolderName" className={classes.label}>
            CARD NUMBER
            <div>
              <input
                maxLength={16}
                id="cardNumber"
                type="text"
                placeholder="Card Number"
                required
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(e.target.value.replace(/\D/g, ''));
                }}
              />
            </div>
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="expiry" className={classes.label}>
              EXP.Date(MM/YYYY)
              <div className={classes.expiryInputContainer}>
                <input
                  maxLength={2}
                  id="expiry"
                  type="text"
                  placeholder="03"
                  required
                  onChange={(e) => {
                    setExpiry({
                      ...expiry,
                      month: e.target.value,
                    });
                  }}
                />
                <input
                  maxLength={4}
                  id="expiry"
                  type="text"
                  placeholder="2022"
                  required
                  onChange={(e) => {
                    setExpiry({
                      ...expiry,
                      year: e.target.value.replace(/\D/g, ''),
                    });
                  }}
                />
              </div>
            </label>
            <label htmlFor="cvv" className={classes.label}>
              CVV
              <div>
                <input
                  id="cvv"
                  type="text"
                  placeholder="1234"
                  value={cvv}
                  required
                  maxLength={4}
                  onChange={(e) => {
                    setCvv(e.target.value);
                  }}
                />
              </div>
            </label>
          </div>
          <div>
            <button className={classes.submitButton}>Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
