'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    // We'll build this logout endpoint on the backend next
    // For now, let's just clear the state and redirect
    try {
        // Ideally you'd have a backend endpoint to invalidate the cookie
        console.log("Logging out...");
        router.push('/login');
    } catch (error) {
        console.error("Logout failed", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!user) {
    return null; // Or a redirect component
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
      <p className="mt-2 text-lg">You are logged in as: {user.email}</p>
      <Button onClick={handleLogout} className="mt-4">
        Logout
      </Button>
    </div>
  );
}