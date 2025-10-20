import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Name has to be more then 2 characters' }),
  lastName: z.string().min(2, { message: 'Surname has to be more then 2 characters' }),
  email: z.email({ message: 'Enter valid email' }),
  phone: z.string().min(10, { message: 'Enter valid phone number' }),
  address: z.string().min(5, { message: 'Enter valid address' }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
