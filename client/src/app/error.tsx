'use client';
import { NavLink } from '@/components';

export default function ErrorBoundry({ error }: { error: Error }) {
  console.log(error.message);
  return (
    <p>
      Ooops, something went wrong. Go back to <NavLink href='/'>Home</NavLink>
    </p>
  );
}
