'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

interface ResumeData {
  id: string;
  title: string;
  experiences: any[];
  educations: any[];
  skills: any[];
}

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchResume = async () => {
        try {
          const response = await api.get('/resumes/my-resume');
          setResumeData(response.data);
        } catch (error) {
          console.error('Failed to fetch resume data', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchResume();
    }
  }, [user]);

  if (isAuthLoading || isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-bold">Resume Editor</h1>
         <Button>Save Changes</Button>
      </div>

      {/* We will build the form here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Editing Area</h2>
          {/* Form will go here */}
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          {/* Preview will go here */}
        </div>
      </div>
    </div>
  );
}