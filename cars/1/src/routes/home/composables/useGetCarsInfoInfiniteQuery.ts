import type { MaybeRefOrGetter } from 'vue';

import { useInfiniteQuery } from '@tanstack/vue-query';
import { toValue } from 'vue';

import type { CarsControllerGetCarsData, CarsPaginatedResponse } from '@/generated/api';

import { getCarsInfo } from '@/generated/api';

export const getCarsInfoInfiniteQueryKey = 'getCarsInfoInfiniteQueryKey';

export const useGetCarsInfoInfiniteQuery = (
  query: MaybeRefOrGetter<CarsControllerGetCarsData['query']>
) =>
  useInfiniteQuery({
    queryKey: [getCarsInfoInfiniteQueryKey, query] as const,
    queryFn: ({ pageParam }) =>
      getCarsInfo({
        query: {
          ...toValue(query),
          page: pageParam,
          limit: 10
        } as CarsControllerGetCarsData['query']
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = (lastPage.data as CarsPaginatedResponse).meta;
      return page < totalPages ? page + 1 : undefined;
    }
  });
