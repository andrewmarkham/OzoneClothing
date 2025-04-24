import Header from "@/components/Header";
import { getDictionary, Locale } from "@/lib/dictionaries";

export default async function ShopLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
    
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
        <Header lang={lang} labels={dict} />
        <main>{children}</main>
        </>
    )
  }