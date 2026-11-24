<script setup lang="ts">
import { computed } from 'vue';

import { useGetCarsRentQuery } from '@/generated/api';

import { RentBadge } from './components';

const getCarsRentQuery = useGetCarsRentQuery();

const rents = computed(() =>
  getCarsRentQuery.data.value?.success ? getCarsRentQuery.data.value.data.rents : []
);
</script>

<template>
  <div class="flex flex-col gap-12 px-30 py-16 min-h-screen bg-[#FBFBFB]">
    <p class="text-2xl font-bold">История бронирований</p>

    <div class="flex flex-col divide-y divide-gray-200">
      <div v-for="rent in rents" :key="rent._id" class="flex items-center gap-6 py-8">
        <div class="w-40 flex-shrink-0">
          <RentBadge :status="rent.status" />
        </div>

        <p class="flex-1 font-medium">
          {{ rent.carInfo.name }}
        </p>

        <p class="text-gray-500 whitespace-nowrap">
          {{ new Date(rent.startDate).toLocaleDateString('ru-RU') }} -
          {{ new Date(rent.endDate).toLocaleDateString('ru-RU') }}
        </p>

        <UButton variant="outline"> Подробнее </UButton>
      </div>
    </div>
  </div>
</template>
