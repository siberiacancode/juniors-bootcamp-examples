<script setup lang="ts">
import { useRoute } from 'vue-router';

import type { Car } from '@/generated/api';

import { BACKEND_URL, CAR_BODY_TYPE_LABELS, CAR_TRANSMISSION_LABELS } from '@/utils/constants';

defineProps<{ car: Car }>();

const route = useRoute();
</script>

<template>
  <RouterLink :to="{ path: `/car/${car.id}`, query: route.query }">
    <UCard class="overflow-hidden transition hover:shadow-md">
      <template #header>
        <div class="aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100">
          <img
            v-if="car.media.length"
            :src="BACKEND_URL + (car.media.find((media) => media.isCover) ?? car.media[0]).url"
            :alt="car.name"
            class="h-full w-full object-cover"
          />
          <div v-else class="flex h-full items-center justify-center text-gray-400">Нет фото</div>
        </div>
      </template>

      <div class="flex flex-col gap-2">
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-sm text-gray-500">
              {{ car.brand }}
            </p>
            <p class="font-semibold">
              {{ car.name }}
            </p>
          </div>
          <p class="whitespace-nowrap font-bold text-primary">
            {{ car.price.toLocaleString() }} ₽/сут
          </p>
        </div>

        <div class="flex flex-wrap gap-2 text-sm text-gray-600">
          <UBadge variant="soft">
            {{ CAR_TRANSMISSION_LABELS[car.transmission] }}
          </UBadge>
          <UBadge variant="soft">
            {{ CAR_BODY_TYPE_LABELS[car.bodyType] }}
          </UBadge>
        </div>

        <p class="text-sm text-gray-500">
          {{ car.location }}
        </p>
      </div>
    </UCard>
  </RouterLink>
</template>
