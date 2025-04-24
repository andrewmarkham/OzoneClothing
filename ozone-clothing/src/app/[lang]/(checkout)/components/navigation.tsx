import Link from 'next/link';
import { ShoppingBag, User, Search } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckoutNavigation = (props: { lang: string, labels: any }) => {

    const cartUrl = `/${props.lang}/cart`;
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
          </div>

          {/* Right section - Icons */}
          <div className="flex items-center space-x-6">
            <button className="md:hidden">
              <Search className="h-6 w-6" />
            </button>
            <Link href="/account" className="hover:text-gray-600">
              <User className="h-6 w-6" />
            </Link>
            <a href={cartUrl}>
              <ShoppingBag className="h-6 w-6" />
            </a>

          </div>
        </div>
      </div>
    </header>

  </>
  );
};

export default CheckoutNavigation; 


