'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Download, LogOut, Save } from 'lucide-react';

interface AuthActionsProps {
  user: { id: string; email: string } | null;
  pathname: string;
  handleLogout: () => void;
}

export function AuthActions({ user, pathname, handleLogout }: AuthActionsProps) {
  const router = useRouter();

  const handleDownload = () => {
    window.dispatchEvent(new CustomEvent('download-resume'));
  };

  const handleSaveChanges = () => {
    window.dispatchEvent(new CustomEvent('save-resume'));
  };

  if (!user) {
    return (
      <>
        <Button variant="ghost" onClick={() => router.push('/login')}>
          Login
        </Button>
        <Button onClick={() => router.push('/sign-up')}>Sign Up</Button>
      </>
    );
  }

  if (pathname === '/dashboard') {
    return (
      <>
        {/* Desktop Dashboard Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" type="button" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button type="button" onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
        {/* Mobile Dashboard Actions */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button>Actions</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Dashboard Actions</SheetTitle>
                <SheetDescription>Save or download your resume.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button type="button" onClick={handleSaveChanges}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
                <Button variant="outline" type="button" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </>
    );
  }

  return (
    <>
      <Button onClick={() => router.push('/dashboard')}>Dashboard</Button>
      <Button variant="ghost" onClick={handleLogout}>Logout</Button>
    </>
  );
}