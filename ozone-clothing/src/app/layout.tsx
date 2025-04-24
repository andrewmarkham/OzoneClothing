import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ApolloWrapper } from '@/lib/apollo-wrapper';
import { JhooseCommerceProvider,MarketProvider } from '@jhoose-commerce/components';
import { Locale } from '@/lib/dictionaries';
import { MarketDetails } from '@jhoose-commerce/core';
import { getCurrentMarketFromCookie } from '@/lib/markets';
import { headers } from 'next/headers';

import { Auth0Provider } from "@auth0/nextjs-auth0";
import { auth0 } from '@/lib/auth0';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ozone Clothing',
  description: 'Your premium clothing destination',
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {

  const {lang} = await params;
  const marketDetails = await getMarketDetails(lang);

  const session = await auth0.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
      <ApolloWrapper>
        <Auth0Provider  user={session?.user}>
          <JhooseCommerceProvider>
            <MarketProvider currency={marketDetails.currency} market={marketDetails.market} language={marketDetails.language} countries={marketDetails.countries}>
              {children}
            </MarketProvider>
          </JhooseCommerceProvider>
        </Auth0Provider>
      </ApolloWrapper>
      </body>
    </html>
  );
} 

async function getMarketDetails(lang: string) : Promise<MarketDetails>  {
  let marketDetails =  await getCurrentMarketFromCookie();

  // If the language in the cookie is different from the language in the props, we need to update the marketDetails from the header
  if (marketDetails?.language !== lang) { 
    const _headers = await headers();
    const cookieHeader = _headers.get("Set-Cookie")?.trim();

    const marketDetailsFromHeader = cookieHeader?.split(";").map((cookiePart: string) => {
      const parts = cookiePart.trim().split("=");
      if (parts[0].trim() === "market") {
        return JSON.parse(decodeURIComponent(parts[1].trim()));
      }
    });
    
    if (marketDetailsFromHeader && marketDetailsFromHeader.length > 0) {
      marketDetails = marketDetailsFromHeader[0] ?? {};
    }
  }

  return marketDetails ?? { currency: "USD", market: "US", marketName: "TBC", language: "en", countries: [] };
}