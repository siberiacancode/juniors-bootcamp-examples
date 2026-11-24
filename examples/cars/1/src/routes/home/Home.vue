<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { CarsControllerGetCarsData } from '@/generated/api';

import type { HomePageFilters } from './types';

import { CarCard, CarsFiltersDrawer } from './components';
import { useGetCarsInfoInfiniteQuery, useQueryDateParam } from './composables';

type CarsInfoQuery = NonNullable<CarsControllerGetCarsData['query']>;

const router = useRouter();
const route = useRoute();

const startDate = useQueryDateParam('startDate');
const endDate = useQueryDateParam('endDate');

const search = computed<string>({
  get: () => route.query.search?.toString() ?? '',
  set: (newValue) =>
    router.push({
      query: { ...route.query, search: newValue ?? undefined }
    })
});

const filters = computed<HomePageFilters>(() => {
  const routeQuery = route.query as HomePageFilters;

  return {
    brand: routeQuery.brand,
    bodyType: routeQuery.bodyType,
    transmission: routeQuery.transmission,
    color: routeQuery.color,
    minPrice: routeQuery.minPrice,
    maxPrice: routeQuery.maxPrice
  };
});

const queryParams = computed<CarsInfoQuery>(() => ({
  search: search.value,
  brand: filters.value.brand as CarsInfoQuery['brand'],
  bodyType: filters.value.bodyType as CarsInfoQuery['bodyType'],
  transmission: filters.value.transmission as CarsInfoQuery['transmission'],
  color: filters.value.color as CarsInfoQuery['color'],
  minPrice: filters.value.minPrice ? Number(filters.value.minPrice) : undefined,
  maxPrice: filters.value.maxPrice ? Number(filters.value.maxPrice) : undefined
}));
const {
  data: carsData,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage
} = useGetCarsInfoInfiniteQuery(queryParams);

const cars = computed(() =>
  carsData.value?.pages.flatMap((page) => (page.success ? page.data.data : []))
);

const carsContainerRef = ref<HTMLElement | null>(null);

useIntersectionObserver(carsContainerRef, ([entry]) => {
  if (entry.isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
    fetchNextPage();
  }
});

const onFiltersSubmit = (newFilters: HomePageFilters) => {
  router.push({
    query: {
      ...route.query,
      ...newFilters
    }
  });
};

const onFiltersReset = () => {
  router.push({
    query: {
      search: route.query.search,
      startDate: route.query.startDate,
      endDate: route.query.endDate
    }
  });
};
</script>

<template>
  <div class="flex flex-col gap-6 px-30 py-16 min-h-screen">
    <div class="flex gap-4 items-end">
      <UFormField label="Поиск">
        <UInput v-model="search" placeholder="Модель машины" />
      </UFormField>
      <UFormField label="Начало аренды">
        <UInputDate v-model="startDate" />
      </UFormField>
      <UFormField label="Конец аренды">
        <UInputDate v-model="endDate" />
      </UFormField>
      <CarsFiltersDrawer
        :filters="filters"
        @on-submit="onFiltersSubmit"
        @on-reset="onFiltersReset"
      />
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CarCard v-for="car in cars" :key="car.id" :car="car" />
    </div>

    <div ref="carsContainerRef" class="flex justify-center">
      <UIcon
        v-if="isFetchingNextPage"
        name="i-heroicons-arrow-path"
        class="animate-spin text-2xl text-primary"
      />
    </div>
  </div>
</template>
