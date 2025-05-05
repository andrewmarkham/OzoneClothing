import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ApolloWrapper } from '@/lib/apollo-wrapper';

import { Auth0Provider } from "@auth0/nextjs-auth0";
import { auth0 } from '@/lib/auth0';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ozone Clothing',
  description: 'Your premium clothing destination',
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth0.getSession();

  return ( 
    <html lang="en">
      <body className={inter.className}>
      
      <ApolloWrapper>
        <Auth0Provider  user={session?.user}>
          {children}
        </Auth0Provider>
      </ApolloWrapper>
      </body>
    </html>
  );
} 
