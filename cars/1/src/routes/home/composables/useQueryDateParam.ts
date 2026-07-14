import type { CalendarDate } from '@internationalized/date';

import { DateFormatter, parseDate } from '@internationalized/date';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const dateFormatter = new DateFormatter('fr-CA');

export const useQueryDateParam = (paramName: string, defaultValue?: CalendarDate) => {
  const route = useRoute();
  const router = useRouter();

  const dateParam = computed({
    get: () => {
      const dateString = route.query[paramName] as string;

      try {
        return dateString ? parseDate(dateString) : defaultValue;
      } catch {
        return defaultValue;
      }
    },
    set: (newValue: CalendarDate) => {
      router.push({
        query: {
          ...route.query,
          [paramName]: dateFormatter.format(newValue.toDate('UTC'))
        }
      });
    }
  });

  return dateParam;
};
