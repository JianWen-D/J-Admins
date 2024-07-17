import React, { ReactNode } from 'react';
import { AuthProvider } from './authContext';
import { CommonProvider } from './commonContext';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <CommonProvider>
      <AuthProvider>{children}</AuthProvider>
    </CommonProvider>
  );
};
