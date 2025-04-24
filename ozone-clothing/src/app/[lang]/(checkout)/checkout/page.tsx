import { getDictionary, Locale } from "@/lib/dictionaries";
import { StripeCheckout } from "@jhoose-commerce/stripe-payment";
import { headers } from 'next/headers';

const CheckoutPage = async ({ params }: { params: Promise<{ slug: string, lang:Locale  }> }) => {

  const { lang } = await params;
  const dict = await getDictionary(lang) ?? {};

  const host = (await headers()).get('host');
  const protocol = 'https';
  const returnUrl = `${protocol}://${host}/${lang}/confirmation/`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl mb-4">Checkout</h1>
      <StripeCheckout cartLabels={dict.cartSummary} checkoutLabels={dict.checkout} returnUrl={returnUrl}  />
    </main>
  );
}

export default CheckoutPage

