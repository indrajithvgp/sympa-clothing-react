import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function StripeCheckoutButton({ price }) {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IL4Y5BJrp2mymXIxuaNxYwp4zAsV7rlS1GL862zajnRGlSg9pB66obUGZS99vAnjoqBlWNLMbSynj7Knv1fYE5w00miq6Otvc";
  const onToken = (token) => {
    // console.log(token)
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => alert("Payment Successful"))
      .catch((error) => {
        console.log("Payment Error: ", JSON.parse(error));
        alert("Issue!!!");
      });
  };
  return (
    <div>
      <StripeCheckout
        label="Pay Now"
        name="Sympa Clothing"
        billingAddress
        shippingAddress
        image="https://svgshare.com/i/CUz.svg"
        description={`Your total is $${price}`}
        amount={priceForStripe}
        currency="CAD"
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
      />
    </div>
  );
}

export default StripeCheckoutButton;
