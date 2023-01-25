import React from "react";

import StripeCheckout from "react-stripe-checkout";

import "./stripe-button.styles.scss";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51MU1yJSABCc9zfm30j4kQOpZRBmrHg2yZm0DipYNuGJwx8e4F8wUfRqDGEi4YsbQ3rzORQjO8b5VrXCEzBkk65iE005yHE8mpe";

  const  onToken = token => {
        console.log(token);
        alert('Payment Successfull');
    }

    return (
        <StripeCheckout
         label="PAY NOW"
         name="CRWN CLOTHING SRV."
          billingAddress
          shippingAddress
          image="https://sendeyo.com/up/d/f3eb2117da"
         description={`YOUR Total is $${price} `}
         amount={priceForStripe}
         token={onToken}
         stripeKey={publishableKey}
          
        />
    )
};

export default StripeCheckoutButton;
