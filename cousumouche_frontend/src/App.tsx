import React from 'react';
import './App.css';
import { AppRoutes } from './utils/routes/routes';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('ta_clé_publique_stripe');

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <AppRoutes />
      </Elements>

    </div>
  );
}

export default App;
