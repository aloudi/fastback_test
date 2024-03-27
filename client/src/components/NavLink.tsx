'use client';
import React from 'react';
import Link, { LinkProps } from 'next/link';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';

interface Props extends LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink = ({ href, children, className, ...rest }: Props) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      href={href}
      className={clsx(
        'hover:text-sky-600',
        isActive && 'font-bold underline',
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};
