import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const carsFiltersFormSchema = toTypedSchema(
  z.object({
    brand: z.string().optional(),
    bodyType: z.string().optional(),
    transmission: z.string().optional(),
    minPrice: z.coerce.string().optional(),
    maxPrice: z.coerce.string().optional(),
    color: z.string().optional()
  })
);

export const brandItems = [
  { label: 'Haval', value: 'Haval' },
  { label: 'Hyundai', value: 'Hyundai' },
  { label: 'Volkswagen', value: 'Volkswagen' },
  { label: 'Kia', value: 'Kia' },
  { label: 'Geely', value: 'Geely' },
  { label: 'Mercedes', value: 'Mercedes' }
];

export const bodyTypeItems = [
  { label: 'Седан', value: 'sedan' },
  { label: 'Внедорожник', value: 'suv' },
  { label: 'Купе', value: 'coupe' },
  { label: 'Хэтчбек', value: 'hatchback' },
  { label: 'Кабриолет', value: 'cabriolet' }
];

export const transmissionOptions = [
  { label: 'Любая' },
  { label: 'Автомат', value: 'automatic' },
  { label: 'Механика', value: 'manual' }
];

export const colorOptions = [
  { value: 'white', hex: '#FFFFFF' },
  { value: 'black', hex: '#1E1E1E' },
  { value: 'red', hex: '#CA251C' },
  { value: 'blue', hex: '#2F54E9' },
  { value: 'green', hex: '##177C44' },
  { value: 'brown', hex: '#764300' }
];

export const PRICE_MIN = 0;
export const PRICE_MAX = 20000;
