'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function PersonalInformationForm() {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
        <CardDescription>Let's start with the basics.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={control} name="fullName" render={({ field }) => ( 
            <FormItem> 
              <FormLabel>Full Name</FormLabel> 
              <FormControl><Input placeholder="example" {...field} />
              </FormControl> 
              <FormMessage /> 
              </FormItem>
          )} />
          <FormField control={control} name="email" render={({ field }) => ( 
            <FormItem> 
              <FormLabel>Email</FormLabel> 
              <FormControl>
                <Input type="email" placeholder="example@email.com" {...field} />
              </FormControl> 
                <FormMessage /> 
            </FormItem> 
          )} />
          <FormField control={control} name="phoneNumber" render={({ field }) => ( 
            <FormItem> 
              <FormLabel>Phone Number</FormLabel> 
              <FormControl>
                <Input placeholder="+91 7979797979" {...field} />
                </FormControl> 
                <FormMessage /> 
          </FormItem> )} />
          <FormField control={control} name="address" render={({ field }) => 
            ( <FormItem> 
              <FormLabel>Address</FormLabel> 
              <FormControl>
                <Input placeholder="City, State" {...field} />
                </FormControl> 
                <FormMessage /> 
              </FormItem> 
            )} />
          <FormField control={control} name="linkedIn" render={({ field }) => (
             <FormItem> 
              <FormLabel>LinkedIn Profile</FormLabel> 
              <FormControl>
                <Input placeholder="https://linkedin.com/in/example" {...field} />
                </FormControl> 
                <FormMessage /> 
                </FormItem> 
          )} />
          <FormField control={control} name="website" render={({ field }) => ( 
            <FormItem> 
              <FormLabel>Personal Website/Portfolio</FormLabel> 
              <FormControl><Input placeholder="https://example.com" {...field} /></FormControl> 
              <FormMessage /> 
          </FormItem> 
          )} />
        </div>
        <FormField control={control} name="summary" render={({ field }) => ( 
          <FormItem> <FormLabel>Professional Summary</FormLabel> 
          <FormControl>
            <Textarea placeholder="A brief 2-3 sentence summary of your career, skills, and goals." className="min-h-[100px]" {...field} />
            </FormControl> 
            <FormMessage /> 
        </FormItem> 
        )} />
      </CardContent>
    </Card>
  );
}