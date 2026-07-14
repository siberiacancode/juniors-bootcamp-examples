import type { Car } from '@/generated/api';

export const CAR_TRANSMISSION_LABELS: Record<Car['transmission'], string> = {
  automatic: 'Автоматическая',
  manual: 'Механическая'
};

export const CAR_BODY_TYPE_LABELS: Record<Car['bodyType'], string> = {
  cabriolet: 'Кабриолет',
  coupe: 'Купе',
  hatchback: 'Хэтчбек',
  sedan: 'Седан',
  suv: 'Внедорожник'
};

export const CAR_STEERING_LABELS: Record<Car['steering'], string> = {
  left: 'Левая',
  right: 'Правая'
};

export const CAR_COLOR_LABELS: Record<Car['color'], string> = {
  black: 'Чёрный',
  blue: 'Синий',
  grey: 'Серый',
  orange: 'Оранжевый',
  red: 'Красный',
  silver: 'Серебристый',
  white: 'Белый'
};
