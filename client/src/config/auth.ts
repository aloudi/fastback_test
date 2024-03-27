import { redirect } from 'next/navigation';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CredentialsSignin } from '@auth/core/errors';
import { JWT } from 'next-auth/jwt';
import { LOGIN_API, REFRESH_API, signInRoute } from '@/constants';

const refreshToken = async (token: JWT): Promise<JWT> => {
  const refreshToken = token.backendTokens.refreshToken;
  if (refreshToken) {
    const res = await fetch(`${process.env.BACKEND_API_URL}${REFRESH_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Refresh ${refreshToken}`,
      },
      body: JSON.stringify({}),
    });

    if (res.status === 401) {
      redirect(`${process.env.FRONTEND_URL}${signInRoute}`);
    }

    const payload = await res.json();

    return {
      ...token,
      ...payload,
    };
  }

  return token;
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials.email || !credentials.password) {
            return null;
          }
          const { email, password } = credentials;
          const res = await fetch(
            `${process.env.BACKEND_API_URL}${LOGIN_API}`,
            {
              method: 'POST',
              body: JSON.stringify({ email, password }),
              headers: { 'Content-Type': 'application/json' },
            }
          );

          if (res.ok) {
            return res.json();
          }

          console.log('Invalid credentials');
          throw new CredentialsSignin('Invalid credentials');
        } catch (error) {
          console.error('Error signing in:', error);
          throw new CredentialsSignin('Error signing in');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      if (
        token?.backendTokens &&
        token?.backendTokens?.expiresIn &&
        new Date().getTime() < new Date(token.backendTokens.expiresIn).getTime()
      ) {
        return token;
      }
      return refreshToken(token);
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token.user,
      };
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
});
