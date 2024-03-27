"use client";
import { ReactNode } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

type Props = {
  children: ReactNode;
}

export const SessionProvider = ({ children }: Props) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}