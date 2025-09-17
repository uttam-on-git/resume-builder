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

interface Experience {
  startDate: string | null | undefined;
  endDate: string | null | undefined;
}

interface Education {
  startDate: string | null | undefined;
  endDate: string | null | undefined;
}

export function usePersistentForm<TFieldValues extends FieldValues>({
  form,
  localStorageKey,
  userId,
}: UsePersistentFormProps<TFieldValues>) {
  const dataLoadedRef = useRef(false);
  const userSpecificKey = userId ? `${localStorageKey}_${userId}` : null;

  useEffect(() => {
    if (userId && !dataLoadedRef.current) {
      const savedDraft = userSpecificKey ? localStorage.getItem(userSpecificKey) : null;

      if (savedDraft) {
        toast.info("Loaded your unsaved draft.");
        form.reset(JSON.parse(savedDraft));
      } else if (userId !== 'guest') {
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
              experiences: resumeData.experiences.map((exp: Experience) => ({
                ...exp,
                startDate: formatDateForInput(exp.startDate),
                endDate: formatDateForInput(exp.endDate),
              })),
              educations: resumeData.educations.map((edu: Education) => ({
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
  }, [userId, userSpecificKey, form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (dataLoadedRef.current && userSpecificKey) {
        localStorage.setItem(userSpecificKey, JSON.stringify(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, userSpecificKey]);

  const clearDraft = () => {
    if (userSpecificKey) {
      localStorage.removeItem(userSpecificKey);
    }
  };

  return { clearDraft };
}