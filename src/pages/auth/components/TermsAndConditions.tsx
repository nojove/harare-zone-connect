
import React from 'react';
import { Link } from 'react-router-dom';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { RegisterFormValues } from '../schema';
import { Button } from '@/components/ui/button';

interface TermsAndConditionsProps {
  form: UseFormReturn<RegisterFormValues>;
  setShowTerms?: (show: boolean) => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ form, setShowTerms }) => {
  return (
    <div className="space-y-2">
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
                I accept the Terms and Conditions
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      
      {setShowTerms && (
        <Button 
          type="button" 
          variant="link" 
          className="p-0 h-auto text-blue-600 hover:text-blue-800"
          onClick={() => setShowTerms(true)}
        >
          Read Terms and Conditions
        </Button>
      )}
    </div>
  );
};
