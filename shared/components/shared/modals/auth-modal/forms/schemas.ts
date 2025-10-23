import {z} from 'zod';

export const passwordSchema = z.string().min(4, { message: 'Enter correct password' });

export const formLoginSchema = z.object({
  email: z.email({ message: 'Enter correct email' }),
  password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
  .extend({
    fullName: z.string().min(2, { message: 'Enter full name'}),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormLoginValues = z.infer<typeof formLoginSchema>;
export type FormRegisterValues = z.infer<typeof formRegisterSchema>;