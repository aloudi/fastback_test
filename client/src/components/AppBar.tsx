import { NavLink, SignInButton } from '@/components';
import { homeRoute, dashboardRoute } from '@/constants';
import { auth } from '@/config/auth';

type Props = {};

export const AppBar = async ({}: Props) => {
  const session = await auth();
  const isSignedIn = !!session?.user;
  return (
    <nav className='bg-gray-800'>
      <div className='max-w-8xl mx-auto px-24'>
        <div className='relative flex h-16 items-center'>
          <div className='flex flex-1 items-center justify-between'>
            <div className='flex gap-2'>
              <NavLink href={homeRoute}>Home</NavLink>
              {isSignedIn ? (
                <NavLink href={dashboardRoute}>Dashboard</NavLink>
              ) : null}
            </div>
            <div>
              <SignInButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
