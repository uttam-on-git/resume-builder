'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { AuthActions } from './AuthActions';

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full lg:px-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <DesktopNav pathname={pathname} />
        <MobileNav user={user} handleLogout={handleLogout} />

        <div className="flex flex-1 items-center justify-end space-x-2">
          <AuthActions
            user={user}
            pathname={pathname}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}