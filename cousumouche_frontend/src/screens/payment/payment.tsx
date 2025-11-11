import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { createStripeSession } from "../../API/api";

const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.error("❌ REACT_APP_STRIPE_PUBLISHABLE_KEY is missing. Check your .env.");
}

const stripePromise = loadStripe(publishableKey as string);

export function CheckoutForm({ total }: { total: number }) {
  const totalAmount = Math.round(total * 100);

  const fetchClientSecret = useCallback(async () => {
    const response = await createStripeSession(totalAmount);
    return response?.data?.clientSecret;
  }, [totalAmount]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
