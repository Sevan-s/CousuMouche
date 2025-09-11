import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { createStripeSession, getStripeStatus } from "../../API/api";
import Stripe from "stripe";

const stripePromise = loadStripe("pk_test_51NSIZ7HiexHhMVstDdU5QphNH5lvdMevutvMLr1LqocTxrnDJIxpC8IzCl6VXAtuKGylraowNJgMU6VjJUIZVkqo00sNmm30hU");

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