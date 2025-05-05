'use client'

import { CART_LOCAL_STORAGE_KEY, removeStorageItem } from "@jhoose-commerce/core";
import { useEffect } from "react";

export const ClearCart = () => {

    useEffect(() => {
        removeStorageItem(CART_LOCAL_STORAGE_KEY);
      }, []);
    
    return <p>Clear Cart</p>
}