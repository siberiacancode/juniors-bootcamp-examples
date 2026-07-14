<script setup lang="ts">
import { DateFormatter, parseDate } from '@internationalized/date';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import type { CarWithRents } from '@/generated/api';

import { useGetCarsInfoByCarIdQuery } from '@/generated/api';
import {
  BACKEND_URL,
  CAR_BODY_TYPE_LABELS,
  CAR_COLOR_LABELS,
  CAR_STEERING_LABELS,
  CAR_TRANSMISSION_LABELS
} from '@/utils/constants';
import { cn } from '@/utils/helpers';

const route = useRoute();
const carId = route.params.id as string;
const dateFormatter = new DateFormatter('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const { data, isPending } = useGetCarsInfoByCarIdQuery({ request: { path: { carId } } });
const car = computed<CarWithRents | undefined>(() =>
  data.value?.success ? data.value.data.data : undefined
);
const imageUrls = computed(() => car.value?.media.map((media) => BACKEND_URL + media.url));

const startDate = route.query.startDate ? parseDate(route.query.startDate as string) : undefined;
const endDate = route.query.endDate ? parseDate(route.query.endDate as string) : undefined;
const rentDays = startDate && endDate ? endDate.compare(startDate) : undefined;
const rentDateRange =
  startDate && endDate
    ? dateFormatter.formatRange(startDate.toDate('UTC'), endDate.toDate('UTC'))
    : undefined;

const carouselRef = ref();
const selectedIndex = ref(0);

const onSelect = (index: number) => (selectedIndex.value = index);
const onThumbnailSelect = (index: number) => carouselRef.value?.emblaApi?.scrollTo(index);
</script>

<template>
  <div
    class="flex my-auto flex-row items-start justify-between gap-10 self-stretch rounded-3xl bg-[#FBFBFB] px-20 py-4"
  >
    <div v-if="isPending" class="flex h-96 w-full items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-3xl text-primary" />
    </div>
    <div v-if="car" class="flex flex-1 flex-col gap-8">
      <div class="flex flex-col gap-4">
        <p class="text-2xl font-bold">Характеристики</p>
        <div class="flex flex-col divide-y divide-gray-200">
          <div class="flex items-center justify-between py-3">
            <span class="text-gray-500">Коробка передач</span>
            <span class="font-medium">{{ CAR_TRANSMISSION_LABELS[car.transmission] }}</span>
          </div>
          <div class="flex items-center justify-between py-3">
            <span class="text-gray-500">Сторона руля</span>
            <span class="font-medium">{{ CAR_STEERING_LABELS[car.steering] }}</span>
          </div>
          <div class="flex items-center justify-between py-3">
            <span class="text-gray-500">Тип кузова</span>
            <span class="font-medium">{{ CAR_BODY_TYPE_LABELS[car.bodyType] }}</span>
          </div>
          <div class="flex items-center justify-between py-3">
            <span class="text-gray-500">Цвет</span>
            <span class="font-medium">{{ CAR_COLOR_LABELS[car.color] }}</span>
          </div>
        </div>
      </div>

      <div v-if="rentDateRange && rentDays" class="flex flex-col gap-3">
        <p class="text-2xl font-bold">Стоимость</p>
        <div>
          <p class="font-medium">Аренда на {{ rentDays }} дней</p>
          <p v-if="rentDateRange" class="text-gray-400">
            {{ rentDateRange }}
          </p>
        </div>
        <p v-if="rentDays" class="text-3xl font-bold">
          Итого: {{ (car.price * rentDays).toLocaleString('ru-RU') }} ₽
        </p>
        <UButton size="xl" block class="mt-2 rounded-2xl"> Забронировать </UButton>
      </div>
    </div>

    <div v-if="car" class="flex flex-1 flex-col gap-4">
      <p class="text-2xl font-bold">
        {{ car.name }}
      </p>

      <UCarousel
        ref="carouselRef"
        v-slot="{ item }"
        :items="imageUrls"
        arrows
        class="w-full"
        @select="onSelect"
      >
        <div class="flex aspect-video w-full items-center justify-center rounded-2xl bg-gray-200">
          <img :src="item" :alt="car.name" class="h-full w-full object-contain" />
        </div>
      </UCarousel>

      <div class="flex gap-4">
        <button
          v-for="(image, index) in imageUrls"
          :key="image"
          type="button"
          class="flex aspect-video flex-1 items-center justify-center overflow-hidden rounded-2xl bg-gray-200 transition"
          :class="
            cn(
              selectedIndex === index && 'ring-2 ring-primary',
              selectedIndex !== index && 'opacity-80 hover:opacity-100'
            )
          "
          @click="onThumbnailSelect(index)"
        >
          <img :src="image" :alt="car.name" class="h-full w-full object-contain" />
        </button>
      </div>
    </div>
  </div>
</template>
