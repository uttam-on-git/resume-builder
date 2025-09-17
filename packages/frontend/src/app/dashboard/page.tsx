'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';

import { ResumeFormValues, resumeSchema } from '@/components/resume/ZodSchema';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { usePersistentForm } from '@/hooks/usePersistentForm';

import { Form } from '@/components/ui/form';
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

  const { clearDraft } = usePersistentForm({
    form,
    localStorageKey: 'resumeDraft',
    userId: user?.id,
  });

  const watchedData = form.watch();
  const [debouncedData] = useDebounce(watchedData, 500);

  const onSubmit = useCallback(
    async (values: ResumeFormValues) => {
      toast.info('Saving your resume...');
      try {
        await api.put('/resumes/my-resume', values);
        toast.success('Resume saved successfully!');
        clearDraft();
      } catch {
        toast.error('Failed to save resume. Please try again.');
      }
    },
    [clearDraft]
  );

  const handleDownload = useCallback(async () => {
    await form.handleSubmit(onSubmit)();
    toast.info('Generating your PDF...');
    try {
      const response = await api.get('/resumes/my-resume/download', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Download started!');
    } catch {
      toast.error('Failed to download PDF.');
    }
  }, [form, onSubmit]);

  useEffect(() => {
    if (isAuthLoading) return;

    if (!user) {
      router.replace('/login');
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    const handleSave = () => {
      form.handleSubmit(onSubmit)();
    };

    window.addEventListener('download-resume', handleDownload);
    window.addEventListener('save-resume', handleSave);

    return () => {
      window.removeEventListener('download-resume', handleDownload);
      window.removeEventListener('save-resume', handleSave);
    };
  }, [form, handleDownload, onSubmit]);

  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading session...
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="min-h-screen bg-gray-50">
          <main className="container mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <PersonalInformationForm />
                <ExperienceForm />
                <EducationForm />
                <SkillsForm />
              </div>

              <div className="lg:sticky top-24 h-fit">
                <h2 className="text-lg font-semibold mb-2 text-center text-gray-600">
                  Live Preview
                </h2>
                <div className="shadow-lg">
                  <ResumePreview data={debouncedData} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </form>
    </Form>
  );
}