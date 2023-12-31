'use client';
import React, {ReactNode} from 'react';
import { SessionProvider } from 'next-auth/react'

type ProviderProps = {
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};


export default Provider;