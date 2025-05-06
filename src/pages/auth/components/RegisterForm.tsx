
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { registerSchema, RegisterFormValues } from '../schema';
import { BasicInfoFields } from './BasicInfoFields';
import { OptionalInfoFields } from './OptionalInfoFields';
import { ContactPreferencesFields } from './ContactPreferencesFields';
import { TermsAndConditions } from './TermsAndConditions';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      cellNumber: '',
      location: '',
      businessName: '',
      serviceType: '',
      bio: '',
      allowCall: true,
      allowSMS: true,
      allowEmail: true,
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await signUp(data.email, data.password, {
        full_name: data.fullName,
        cell_number: data.cellNumber,
        location: data.location,
        business_name: data.businessName || null,
        service_type: data.serviceType || null,
        bio: data.bio || null,
        is_visible: true,
        allow_call: data.allowCall,
        allow_sms: data.allowSMS,
        allow_email: data.allowEmail,
      });

      if (error) {
        toast.error(`Registration failed: ${error.message}`);
      } else {
        toast.success("Account created successfully!");
        navigate('/auth/login');
      }
    } catch (error: any) {
      toast.error(`An unexpected error occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoFields form={form} />
        <OptionalInfoFields form={form} />
        <ContactPreferencesFields form={form} />
        <TermsAndConditions form={form} />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
};
