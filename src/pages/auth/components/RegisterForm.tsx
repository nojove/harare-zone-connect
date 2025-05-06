
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

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
    // Check if terms are accepted
    if (!data.termsAccepted) {
      setShowTerms(true);
      return;
    }

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

  const handleAcceptTerms = () => {
    form.setValue('termsAccepted', true);
    setShowTerms(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoFields form={form} />
          <OptionalInfoFields form={form} />
          <ContactPreferencesFields form={form} />
          <TermsAndConditions form={form} setShowTerms={setShowTerms} />

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

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogDescription>
              Please read and accept our Terms and Conditions to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
            <p className="mb-4">
              Welcome to Harare Zone Connect. By using our service, you agree to these Terms and Conditions.
              These Terms constitute a legally binding agreement between you and Harare Zone Connect regarding your use of the platform.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">2. User Accounts</h3>
            <p className="mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times.
              You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">3. Content</h3>
            <p className="mb-4">
              Our platform allows you to post content. You are responsible for the content that you post, including its legality, reliability, and appropriateness.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">4. Prohibited Uses</h3>
            <p className="mb-4">
              You may not use our platform for any illegal purpose or to violate any laws in your jurisdiction.
              You may not post any content that is defamatory, obscene, or otherwise offensive.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">5. Privacy</h3>
            <p className="mb-4">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose information about you.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTerms(false)}>
              Decline
            </Button>
            <Button onClick={handleAcceptTerms}>
              Accept Terms & Conditions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
