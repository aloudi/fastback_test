import React from 'react';
import { clsx } from 'clsx';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type: 'submit' | 'reset' | 'button' | undefined;
};

export const Button = ({
  children,
  onClick,
  className,
  disabled,
  type,
}: Props) => {
  return (
    <button
      className={clsx(
        'rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700',
        className
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
