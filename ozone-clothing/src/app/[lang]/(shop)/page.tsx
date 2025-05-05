import ProductCarouselWithData from '@/components/ProductCarouselWithData';
import { Locale } from '@/lib/dictionaries';
import { getMarketDetails } from '@/lib/markets';

export default async function Home({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {

  const {lang} = await params;
  const marketDetails = await getMarketDetails(lang);

  console.log(marketDetails)
  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">Welcome to Ozone Clothing</h1>
        <p className="mt-4 text-xl text-gray-600">Discover our latest collections</p>
        <div className="mt-8">
          <ProductCarouselWithData heading='Latest Mens Products' market={marketDetails} parentCategory={['mens']} />
          <ProductCarouselWithData heading='Latest Womens Products'market={marketDetails} parentCategory={['womens']} />
        </div>
      </main>

    </div>
  );
} 