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
            form.reset(response.data);
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