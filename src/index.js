import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Elements>
  </React.StrictMode>
);
