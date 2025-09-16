'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Download, Menu, Mountain } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = () => {
    window.dispatchEvent(new CustomEvent('download-resume'));
  };

  const handleSaveChanges = () => {
    window.dispatchEvent(new CustomEvent('save-resume'));
  };

  if (!mounted) {
    return null; 
  }

  return (
    <header className="sticky top-0 z-50 w-full lg:px-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Mountain className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Resume Builder
            </span>
          </Link>
          {pathname !== '/dashboard' && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/#features" className={navigationMenuTriggerStyle()}>
                      Features
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/#pricing" className={navigationMenuTriggerStyle()}>
                      Pricing
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/#about" className={navigationMenuTriggerStyle()}>
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user ? (
            pathname === '/dashboard' ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" type="button" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button type="button" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button onClick={() => router.push('/dashboard')} className='cursor-pointer'>Dashboard</Button>
            )
          ) : (
            <>
              <Button variant="ghost" className='cursor-pointer' onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button className='cursor-pointer' onClick={() => router.push('/sign-up')}>Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Mountain className="h-6 w-6" />
                    <span className="font-bold">Resume Builder</span>
                  </Link>
                </SheetTitle>
                <SheetDescription>
                  Navigate the site using the links below.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                <Link href="/#features">Features</Link>
                <Link href="/#pricing">Pricing</Link>
                <Link href="/#about">About</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}