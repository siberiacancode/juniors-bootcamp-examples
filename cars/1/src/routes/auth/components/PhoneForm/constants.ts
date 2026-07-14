import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';

export const phoneFormSchema = toTypedSchema(
  z.object({ phone: z.string().min(18, 'Fill phone correctly') })
);
