import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import React, { useMemo, useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { FaRegCreditCard } from 'react-icons/fa';
import WalletsModal from './Modals/ConnectWallet';

export const PayPal = () => {
  const initialOptions = {
    'client-id': 'test',
    currency: 'USD',
    intent: 'capture',
  };
  return (
    <div className="sm:w-2/4 mt-8">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons />
      </PayPalScriptProvider>
    </div>
  );
};

export const Bitcoin = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="sm:w-2/4 mt-8">
      <WalletsModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <button
        onClick={() => {
          setModalOpen(!modalOpen);
        }}
        type="button"
        className="w-full flex-rows gap-3 text-sm p-3 hover:bg-subMain transitions rounded text-white bg-main"
      >
        <FaRegCreditCard /> Connect Wallet
      </button>
    </div>
  );
};

export const Stripe = () => {
  const useOptions = () => {
    const options = useMemo(
      () => ({
        style: {
          invalid: {
            color: '#FF1E1E',
          },
        },
      }),
      []
    );

    return options;
  };

  const options = useOptions();

  return (
    <div className="sm:w-2/4 mt-8">
      <label>
        <CardElement
          options={options}
          className="bg-white text-black px-3 py-4 shadow rounded"
        />
      </label>
    </div>
  );
};
