import React from 'react';
import { clsx } from 'clsx';

type Props = {
  children: React.ReactNode;
};

export const ContentWrapper = ({ children }: Props) => (
  <main className={clsx('flex min-h-screen flex-col bg-gray-600 px-24 py-6')}>
    {children}
  </main>
);
