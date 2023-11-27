'use client';
import React, {ReactNode} from 'react';
import { SessionProvider } from 'next-auth/react';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';

type ProviderProps = {
  children: ReactNode;
};

const initialOptions = {
    clientId: "AR2fHinqnT_ZXjHT2SfTX-l7BgWf0SHvi4MFmycGkiabOlRwc4HZl9Olt_QM2g2qWPP8eQ0td-MUVzSa",
    currency: "BRL",
    intent: "capture",
}

const PaypalProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
};


export default PaypalProvider;