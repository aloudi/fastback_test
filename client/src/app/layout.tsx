import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppBar, ContentWrapper, SessionProvider } from '@/components';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Fastback',
    template: `%s | Fastback`,
  },
  description: 'Fastback test app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang='en'>
        <body className={inter.className}>
          <AppBar />
          <ContentWrapper>{children}</ContentWrapper>
        </body>
      </html>
    </SessionProvider>
  );
}
