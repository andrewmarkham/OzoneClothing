'use client';
import { useQuery } from '@apollo/client';
import ProductCarousel from './ProductCarousel';
import { ProductQuery } from './ProductCarousel.server';

/*
type ProductQueryType = (variables: {
  market: string;
  parentCategory: string[];
  limit: number;
}) => Promise<QueryResponse>;
*/
export default function ProductCarouselWithData(props: {heading: string, marketId: string, parentCategory: string[], limit?: number}) {

  const imagehost = 'http://localhost:5001/';
  const { data } = useQuery(ProductQuery, {
    variables: {
      market: props.marketId,
      parentCategory: props.parentCategory,
      limit: props.limit || 8
    }
})

  // Transform the data to match our ProductCard props
  const products = data?.GenericProduct?.items?.map((item) => ({
    id: item?.Code ?? '', 
    name: item?.DisplayName ?? '',
    price: item?.LowestPriceOfVariationPerMarket?.find(i => i?.MarketName === props.marketId)?.Price || 0,
    images: [`${imagehost}${item?.DefaultImageUrl ?? ''}`], // You might want to fetch additional images
    slug: item?.RelativePath ?? ''
  })) || [];

  return <ProductCarousel heading={props.heading} products={products} />;
}