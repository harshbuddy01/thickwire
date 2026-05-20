import { z } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

// Login form validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Signup form validation
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional().or(z.literal('')),
});

// Support ticket validation
export const supportTicketSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  orderId: z.string().optional().or(z.literal('')),
});

// Review validation
export const reviewSchema = z.object({
  serviceId: z.string().min(1, 'Invalid service ID'),
  orderId: z.string().optional(),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().max(1000, 'Comment must be less than 1000 characters').optional(),
});

// Checkout validation
export const checkoutSchema = z.object({
  planId: z.string().min(1, 'Invalid plan ID'),
  gateway: z.enum(['wallet', 'upi-direct', 'nowpayments']),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().optional().or(z.literal('')),
});

// Forgot Password validation
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Reset Password validation
export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// URL parameter validation
export const orderIdParamSchema = z.string().regex(/^[a-zA-Z0-9_-]{8,36}$/, 'Invalid order ID');
export const serviceSlugParamSchema = z.string().regex(/^[a-z0-9-]+$/, 'Invalid service slug');
export const pageParamSchema = z.coerce.number().int().positive('Page must be a positive integer');

// OAuth redirect validation
export const redirectUrlSchema = z.string().refine(
  (url) => {
    // Must be relative path and not protocol-relative (e.g. starts with //)
    if (url.startsWith('/') && !url.startsWith('//')) return true;
    try {
      const parsed = new URL(url);
      if (typeof window !== 'undefined') {
        return parsed.hostname === window.location.hostname;
      }
      return false;
    } catch {
      return false;
    }
  },
  'Invalid redirect URL'
).refine(
  (url) => !url.match(/^(javascript|data|vbscript):/i),
  'Protocol handlers not allowed'
);

// Validation helper
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        })),
      };
    }
    throw error;
  }
}
