<script setup lang="ts">
import { CheckCircle2Icon, CirclePlusIcon } from 'lucide-vue-next';

import type { CarRent } from '@/generated/api';

interface RentBadgeProps {
  status: CarRent['status'];
}
const props = defineProps<RentBadgeProps>();

const STATUS_MAP = {
  0: { label: 'создан', color: 'success', icon: CirclePlusIcon },
  1: { label: 'активен', color: 'warning', icon: CheckCircle2Icon }
} as const;
</script>

<template>
  <UBadge
    :color="STATUS_MAP[props.status].color"
    variant="soft"
    class="rounded-full px-3 py-1.5 gap-1.5 text-sm font-medium"
  >
    <component :is="STATUS_MAP[props.status].icon" class="size-4" />
    {{ STATUS_MAP[props.status].label }}
  </UBadge>
</template>
