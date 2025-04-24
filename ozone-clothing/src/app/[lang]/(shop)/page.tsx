import ProductCarouselWithData from '@/components/ProductCarouselWithData';

export default async function Home() {
  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">Welcome to Ozone Clothing</h1>
        <p className="mt-4 text-xl text-gray-600">Discover our latest collections</p>
        <div className="mt-8">
          <ProductCarouselWithData heading='Latest Mens Products' marketId='USA' parentCategory={['mens']} />
          <ProductCarouselWithData heading='Latest Womens Products'marketId='USA' parentCategory={['womens']} />
        </div>
      </main>

    </div>
  );
} 