'use client';

import Link from 'next/link';
import { ShoppingBag, Heart, User, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold">
              Ozone
            </Link>
            
            {/* Main Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/men" className="text-sm font-medium hover:text-gray-600">
                MEN
              </Link>
              <Link href="/women" className="text-sm font-medium hover:text-gray-600">
                WOMEN
              </Link>
              <Link href="/kids" className="text-sm font-medium hover:text-gray-600">
                KIDS
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
            <Link href="/account" className="hover:text-gray-600">
              <User className="h-6 w-6" />
            </Link>
            <Link href="/wishlist" className="hover:text-gray-600">
              <Heart className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="hover:text-gray-600">
              <ShoppingBag className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 