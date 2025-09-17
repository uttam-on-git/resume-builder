'use client';

import { useEffect, useRef } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import api from '@/lib/api';

interface UsePersistentFormProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  localStorageKey: string;
  userId?: string;
}

export function usePersistentForm<TFieldValues extends FieldValues>({
  form,
  localStorageKey,
  userId,
}: UsePersistentFormProps<TFieldValues>) {
  const dataLoadedRef = useRef(false);

  useEffect(() => {
    if (userId && !dataLoadedRef.current) {
      const savedDraft = localStorage.getItem(localStorageKey);

      if (savedDraft) {
        toast.info("Loaded your unsaved draft.");
        form.reset(JSON.parse(savedDraft));
      } else {
        api
          .get('/resumes/my-resume')
          .then((response) => {
            const resumeData = response.data;

            const formatDateForInput = (dateString: string | null | undefined): string => {
              if (!dateString) return '';
              return dateString.split('T')[0];
            };

            const formattedData = {
              ...resumeData,
              experiences: resumeData.experiences.map((exp: any) => ({
                ...exp,
                startDate: formatDateForInput(exp.startDate),
                endDate: formatDateForInput(exp.endDate),
              })),
              educations: resumeData.educations.map((edu: any) => ({
                ...edu,
                startDate: formatDateForInput(edu.startDate),
                endDate: formatDateForInput(edu.endDate),
              })),
            };

            form.reset(formattedData);
            toast.success('Resume data loaded!');
          })
          .catch(() => {
            toast.error('Could not load resume data.');
          });
      }
      dataLoadedRef.current = true;
    }
  }, [userId, form, localStorageKey]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (dataLoadedRef.current) {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, localStorageKey]);

  const clearDraft = () => {
    localStorage.removeItem(localStorageKey);
  };

  return { clearDraft };
}