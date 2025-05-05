
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { RegisterFormValues } from '../schema';

interface OptionalInfoFieldsProps {
  form: UseFormReturn<RegisterFormValues>;
}

export const OptionalInfoFields: React.FC<OptionalInfoFieldsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Optional Information</h3>

      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Your Business" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="serviceType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Service Type (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Plumber, Electrician" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Brief description about yourself" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
