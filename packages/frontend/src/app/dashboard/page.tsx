'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

import { ResumeFormValues, resumeSchema } from '@/components/resume/ZodSchema';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { usePersistentForm } from '@/hooks/usePersistentForm';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
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

  const handleDownload = async () => {
    toast.info("Generating your PDF...");
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
      
      toast.success("Download started!");
    } catch{
      toast.error("Failed to download PDF.");
    }
  };

  async function onSubmit(values: ResumeFormValues) {
    toast.info('Saving your resume...');
    try {
      await api.put('/resumes/my-resume', values);
      toast.success('Resume saved successfully!');
      clearDraft();
    } catch{
      toast.error('Failed to save resume. Please try again.');
    }
  }

  useEffect(() => {
    if (!user && !isAuthLoading) {
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading session...
      </div>
    );
  }

  // while redirecting, render nothing
  if (!user && !isAuthLoading) {
    return null;
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto p-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Resume Editor</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" type="button" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
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

              <div className="lg:sticky top-24 h-fit">
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