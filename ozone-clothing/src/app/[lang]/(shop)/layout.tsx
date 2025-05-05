import Header from "@/components/Header";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { getMarketDetails } from "@/lib/markets";
import { JhooseCommerceProvider, MarketProvider } from "@jhoose-commerce/components";

export default async function ShopLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
    
    const { lang } = await params;
    const marketDetails = await getMarketDetails(lang);
    const dict = await getDictionary(lang);

    return (
        <JhooseCommerceProvider>
          <MarketProvider currency={marketDetails.currency} market={marketDetails.market} language={marketDetails.language} countries={marketDetails.countries}>
            <Header lang={lang} labels={dict} />
            <main>{children}</main>
          </MarketProvider>
      </JhooseCommerceProvider>

    )
  }