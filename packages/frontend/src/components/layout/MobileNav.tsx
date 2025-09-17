'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { LogOut, Menu, Mountain } from 'lucide-react';

interface MobileNavProps {
  user: { id: string; email: string } | null;
  handleLogout: () => void;
}

export function MobileNav({ user, handleLogout }: MobileNavProps) {
  return (
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
              <Link href="/" className="flex items-center space-x-2">
                <Mountain className="h-6 w-6" />
                <span className="font-bold">Resume Builder</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col space-y-2">
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/#features">Features</Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/#pricing">Pricing</Link>
            </Button>
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/#about">About</Link>
            </Button>
            {user && (
              <>
                <Separator className="my-2" />
                <Button variant="ghost" onClick={handleLogout} className="justify-start text-red-500 hover:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}