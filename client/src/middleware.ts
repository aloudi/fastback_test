import { auth } from '@/config/auth';
import { NextResponse } from 'next/server';
import { signInRoute } from '@/constants';

export default auth((req) => {
  const user = req.auth?.user;
  if (!user) {
    return NextResponse.redirect(`${process.env.FRONTEND_URL}${signInRoute}`);
  }
});

export const config = {
  matcher: ['/dashboard/:path*'],
};
