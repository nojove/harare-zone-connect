
import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .length(4, 'Password must be exactly 4 digits')
    .regex(/^\d{4}$/, 'Password must contain only digits'),
  cellNumber: z.string().min(8, 'Cell number is required'),
  location: z.string().min(2, 'Location is required'),
  businessName: z.string().optional(),
  serviceType: z.string().optional(),
  bio: z.string().optional(),
  allowCall: z.boolean().default(true),
  allowSMS: z.boolean().default(true),
  allowEmail: z.boolean().default(true),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
