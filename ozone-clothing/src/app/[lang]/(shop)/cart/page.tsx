
import { getDictionary, Locale } from "@/lib/dictionaries";
import { MiniCart } from "@jhoose-commerce/components";

export default async function CartPage({ params }: { params: Promise<{ slug: string, lang:Locale  }> }) {

  const { lang } = await params;
  const dict = await getDictionary(lang);
  const checkoutUrl = `/${lang}/checkout`;

  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl mb-4">{dict.minicart.heading}</h1>
        <MiniCart mode="onpage" show={true} checkoutUrl={checkoutUrl}  labels={dict.minicart} />
      </main>
  );
}