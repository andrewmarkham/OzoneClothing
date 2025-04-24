import { GenericNode, GenericProduct } from "@/graphql/graphql";

import ProductCard  from "./ProductCard";
import { MarketDetails } from "@jhoose-commerce/core";
import { CategoryFilters } from "./CategoryFilters";

export type CategoryAndProductsProps = {
  currentNode: GenericNode, genericNodes: GenericNode[], genericProducts: GenericProduct[], market: MarketDetails, lang: string
}

export const CategoryAndProducts = (props: CategoryAndProductsProps) => {
  
  const imagehost = process.env.COMMERCE_ENDPOINT ?? "";

  return (
    <>
      <div>
        <h1 className="text-4xl mb-4">{props.currentNode?.DisplayName}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.currentNode?.Description ?? "" }}></div>
      </div>
      <div className="w-full">
        <CategoryFilters categories={props.genericNodes as GenericNode[]} />
      </div>
      <div>
        <p className="text-right mb-2">Total: {props.genericProducts.length}</p>
      </div>
      <div className="grid grid-cols-4 gap-4">

        {props.genericProducts &&
          props.genericProducts?.map((item, index) => {
            const p = {
              id: item?.Code ?? '', 
              name: item?.DisplayName ?? '',
              price: item?.LowestPriceOfVariationPerMarket?.find(i => i?.MarketName === props.market.market)?.Price || 0,
              images: [`${imagehost}${item?.DefaultImageUrl ?? ''}`], // You might want to fetch additional images
              slug: item?.RelativePath ?? ''
            };
            return (
              <ProductCard key={index} {...p} />
            );
          })}
      </div>
    </>
  );
};
