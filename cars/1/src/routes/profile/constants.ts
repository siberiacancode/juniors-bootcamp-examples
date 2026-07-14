import z from 'zod';

export const profileFormSchema = z.object({
  lastname: z.string().optional(),
  firstname: z.string().optional(),
  middlename: z.string().optional(),
  phone: z.string().min(1, 'Введите телефон'),
  email: z.union([z.literal(''), z.string().email('Некорректный email')]).optional(),
  city: z.string().optional()
});
