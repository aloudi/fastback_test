import { NavLink } from '@/components';
import { dashboardRoute, signInRoute } from '@/constants';
import { auth } from '@/config/auth';

export default async function HomePage() {
  const session = await auth();
  const isSignedIn = !!session?.user?.email;
  return (
    <>
      <h1 className='mb-4'>Home Page</h1>
      {isSignedIn ? (
        <>
          <p>
            Welcome back{' '}
            <span className='text-amber-500'>{session?.user.email}</span>.
          </p>
          <p>
            Please visit the{' '}
            <NavLink href={dashboardRoute} className='text-amber-200'>
              dashboard
            </NavLink>{' '}
            to view your latest posts.
          </p>
        </>
      ) : (
        <>
          <p>Welcome to the home page.</p>
          <p>
            Please{' '}
            <NavLink href={signInRoute} className='text-amber-200'>
              sign In
            </NavLink>{' '}
            to access the dashboard.
          </p>
        </>
      )}
    </>
  );
}
