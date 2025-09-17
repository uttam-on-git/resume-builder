'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    if (token) {
      api
        .get(`/users/verify-email?token=${token}`)
        .then(() => setMessage('Email verified successfully! You can now log in.'))
        .catch(() => setMessage('Invalid or expired verification link.'));
    } else {
      setMessage('No verification token found.');
    }
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>{message}</p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}