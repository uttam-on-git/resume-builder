'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResumeFormValues, resumeSchema } from '@/components/resume/ZodSchema';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { PersonalInformationForm } from '@/components/resume/PersonalInformationForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      title: 'My Resume',
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      linkedIn: '',
      website: '',
      summary: '',
      experiences: [],
      educations: [],
      skills: [],
    },
    mode: 'onChange',
  });

  // handle user authentication and data fetching
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      toast.info('Loading your resume data...');
      api.get('/resumes/my-resume').then((response) => {
        form.reset(response.data);
        toast.success('Resume data loaded!');
      }).catch(err => {
        toast.error('Could not load resume data.');
      });
    }
  }, [user, isAuthLoading, router, form]);

  const watchedData = form.watch();

  // Handle form submission
  async function onSubmit(values: ResumeFormValues) {
    toast.info('Saving your resume...');
    try {
      await api.put('/resumes/my-resume', values);
      toast.success('Resume saved successfully!');
    } catch (error) {
      toast.error('Failed to save resume. Please try again.');
    }
  }

  if (isAuthLoading) {
    return <div className="flex h-screen items-center justify-center">Loading session...</div>;
  }
  if (!user) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Resume Editor</h1>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </header>
          
          <main className="container mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <PersonalInformationForm />
                <ExperienceForm />
                <EducationForm />
                <SkillsForm />
              </div>

              <div className="sticky top-24 h-fit">
                <h2 className="text-lg font-semibold mb-2 text-center text-gray-600">Live Preview</h2>
                <div className="shadow-lg">
                  <ResumePreview data={watchedData} />
                </div>
              </div>

            </div>
          </main>
        </div>
      </form>
    </Form>
  );
}