import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';

export const otpFormSchema = toTypedSchema(z.object({ otp: z.string().min(6, 'Required field') }));
