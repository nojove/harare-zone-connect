
import React from 'react';
import { Link } from 'react-router-dom';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { RegisterFormValues } from '../schema';

interface TermsAndConditionsProps {
  form: UseFormReturn<RegisterFormValues>;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="termsAccepted"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              I accept the{' '}
              <Link to="/terms" className="text-blue-600 hover:underline">
                terms and conditions
              </Link>
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
