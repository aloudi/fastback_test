'use server';
import { Button } from '@/components';
import { signOutRoute } from '@/constants';
import { auth, signIn } from '@/config/auth';
import { redirect } from 'next/navigation';

export const SignInButton = async () => {
  const session = await auth();

  const handleSignIn = async () => {
    'use server';
    await signIn();
  };

  const handleSignOut = async () => {
    'use server';
    redirect(signOutRoute);
  };

  return session?.user?.email ? (
    <div className='flex items-center gap-4'>
      <div className='text-sky-600'>{session.user.email}</div>
      <form action={handleSignOut}>
        <Button type='submit'>Sign Out</Button>
      </form>
    </div>
  ) : (
    <form action={handleSignIn}>
      <Button type='submit'>Sign In</Button>
    </form>
  );
};
