'use client';

import Link from 'next/link';
import { ShoppingBag, Search } from 'lucide-react';
import { Drawer, MiniCart } from '@jhoose-commerce/components';
import { useState } from 'react';
import { Authentication } from './authentication';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header = (props: { lang: string, labels: any }) => {
    const [showMiniCart, setShowMiniCart] = useState(false);
    const checkoutUrl = `/${props.lang}/checkout`

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href={`/${props.lang}`} className="text-2xl font-bold">
              Ozone
            </Link>
            
            {/* Main Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href={`/${props.lang}/products/mens`} className="text-sm font-medium hover:text-gray-600">
                MEN
              </Link>
              <Link href={`/${props.lang}/products/womens`} className="text-sm font-medium hover:text-gray-600">
                WOMEN
              </Link>
            </nav>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Right section - Icons */}
          <div className="flex items-center space-x-6">
            <button className="md:hidden">
              <Search className="h-6 w-6" />
            </button>

            <Authentication />
 
            <button onClick={() => setShowMiniCart(!showMiniCart)}>
              <ShoppingBag className="h-6 w-6" />
          </button>
          </div>
        </div>
      </div>
    </header>

    <Drawer heading={props.labels.minicart.heading} show={showMiniCart} close={() => setShowMiniCart(false)}>
      <MiniCart show={showMiniCart} checkoutUrl={checkoutUrl}  labels={props.labels.minicart} />
    </Drawer>
  </>
  );
};

export default Header; 