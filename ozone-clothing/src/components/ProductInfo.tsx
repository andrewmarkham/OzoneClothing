'use client';
import React, { useState, useContext } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { GenericProduct, Locales } from "@/graphql/graphql";
import { ProductPrice } from '@jhoose-commerce/components';

import { useQuery } from '@apollo/client';
import { VariantDetail } from '@/app/[lang]/(shop)/products/[...slug]/graphql/VariantDetail';


import { AddToCart, ProductSummaryContext, ProductSummaryContextType, useJhooseCommerce } from '@jhoose-commerce/components';

interface ProductInfoProps {
    product: GenericProduct
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColour, setSelectedColour] = useState('');
  const [selectedSku, setSelectedSku] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { marketContext } = useJhooseCommerce();
  const productSummary = useContext<ProductSummaryContextType>(ProductSummaryContext);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const { data } = useQuery(VariantDetail, {
        variables: {
            productId : product?.ContentLink?.GuidValue ?? "",
            languages : marketContext.language as Locales
        }
    })

    const items = data?.GenericVariant?.items;
    
    console.log(items);

    // This would typically fetch product data based on the ID
    const _product = {
        id: product.Code,
        name: product.DisplayName,
        price: 100.00,
        rating: 4.5,
        reviewCount: 38,
        description: product.Description,
        shipping: 'Free Shipping for Red Tab™ Members',
        sizes: [],
        variants: items?.map(v => { return {
            code : v?.Code ?? "",
            size: v?.Size ?? "",
            colour: v?.Color ?? "",
            quantity: productSummary.skus.find(d => d.sku === v?.Code)?.inventory[0]?.purchaseAvailableQuantity ?? 0
        } }),
        fitInfo: 'Runs somewhat big',
      };
      
      const uniqueColours = [...new Set( _product?.variants?.map(v => v.colour)) ];
      
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{_product.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`h-5 w-5 ${
                  rating < _product.rating
                    ? 'text-yellow-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({_product.reviewCount})
          </span>
        </div>
      </div>
      
        <ProductPrice style='showDiscount' includePromotions={true}  />

      <div>
        <p className="mt-2 text-gray-600">{_product.description}</p>
      </div>
<div>
        <h3 className="font-medium mb-4">Colours</h3>
        <div className="flex gap-2">
          {uniqueColours.map((colour) => (
            <button
              key={colour}
              className={`px-4 py-2 border ${
                selectedColour === colour
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-600'
              }`}
              onClick={() => {setSelectedColour(colour); setSelectedSize(''); setSelectedSku('')}}
            >
              {colour}
            </button>
          ))}
        </div>
        </div>
      <div>
        <h3 className="font-medium mb-4">Size</h3>
        <div className="flex gap-2">
          {_product.variants?.filter(v=>v.colour === selectedColour).map((v) => (
            <button
              key={v.size}
              className={`px-4 py-2 border ${
                selectedSize === v.size
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-gray-600'
              }`}
              onClick={() => {setSelectedSize(v.size); setSelectedSku(v.code)}}
            >
              {v.size}
            </button>
          ))}
        </div>

      </div>

      <div>
        <h3 className="font-medium mb-4">Select Quantity</h3>
        <div className="flex items-center gap-4">
          <button
            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="w-8 h-8 border border-gray-300 flex items-center justify-center"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
      </div>

      <div className='flex flex-col grow'>
        <AddToCart sku={selectedSku} qty={quantity} text={"Add to Cart"} disabled={!selectedSku}  />
      </div>
    </div>
  );
} 