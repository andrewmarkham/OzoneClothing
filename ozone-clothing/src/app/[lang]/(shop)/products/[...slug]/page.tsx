import React from 'react';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductInfo } from '@/components/ProductInfo';
import { GenericNode, GenericProduct, Locales } from "@/graphql/graphql";
import { getClient } from '@/lib/client';
import { ProductCategoryQuery } from "./graphql/ProductCategoryQuery";
import { GetProductQuery, ProductQuery } from "./graphql/ProductQuery";


import { MarketDetails } from '@jhoose-commerce/core';

import { getCurrentMarketFromCookie } from '@/lib/markets';
import { CategoryAndProducts } from '@/components/CategoryAndProducts';
import { ProductSummaryProvider } from '@jhoose-commerce/components';

export default async function ProductPage({ params }: { params: Promise<{ slug: string, lang: Locales }> }) {

  const imagehost = process.env.COMMERCE_ENDPOINT ?? "";
  const { lang, slug } = await params;
  const segment = slug[slug.length - 1];

  const market = await getCurrentMarketFromCookie() ?? {} as MarketDetails;

  const { currentNode, genericNodes, genericProducts } = await getData(lang, segment, market.marketName);

  const isProductDetail = (currentNode?._link?.GenericNode?.items?.length ?? 0) === 0 && genericProducts.length === 1;

  return isProductDetail ? 
    renderProduct(genericProducts[0] as GenericProduct, imagehost) : 
    renderPlp(genericNodes, genericProducts);

  function renderProduct(product: GenericProduct, imagehost: string ) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductGallery images={[`${imagehost}/${(product)?.DefaultImageUrl ?? ''}`]} />
          <ProductSummaryProvider productCode={product?.Code ?? ""}>
            <ProductInfo product={product} />
          </ProductSummaryProvider>
          
        </div>
      </div>
    );
  }
  function renderPlp(nodes: Array<GenericNode>, products: Array<GenericProduct>) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="">
          <CategoryAndProducts 
              currentNode={currentNode as GenericNode} 
              genericNodes={nodes} 
              genericProducts={products} 
              market={market} 
              lang={lang} />
        </div>
      </div>
    );
  }
  
} 


async function getData(languages: Locales, segment: string, market: string) {

  const { data } = await getClient().query(
    {
      query: ProductCategoryQuery,
      variables:
      {
        languages: languages,
        segment: segment
      }
    });

  const currentNode = data?.GenericNode?.items?.at(0) as GenericNode;
  const genericNodes = data?.GenericNode?.items?.at(0)?._link?.GenericNode?.items?.filter(f => f !== null) ?? [];


  if (data.GenericNode?.items?.length ?? 0 > 0) {
    console.log(`getting products ${languages} ${currentNode?.Code} ${market}`)
    const productResponse = await getClient().query(
      {
        query: ProductQuery,
        variables:
        {
          languages: languages,
          category: currentNode?.Code ?? "",
          market: market
        }
      });


    const genericProducts = productResponse.data?.GenericProduct?.items?.filter(f => f !== null) ?? [];
    return { currentNode, genericNodes, genericProducts };
  }
  else {
    const productResponse = await getClient().query(
      {
        query: GetProductQuery,
        variables:
        {
          languages: languages,
          segment: segment
        }
      });

    const genericProducts = productResponse.data?.GenericProduct?.items?.filter(f => f !== null) ?? [];

    return { currentNode, genericNodes, genericProducts };
  }

}