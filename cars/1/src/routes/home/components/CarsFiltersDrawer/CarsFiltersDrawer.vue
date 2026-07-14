<script setup lang="ts">
import { useForm, Field as VeeField } from 'vee-validate';
import { ref, watch } from 'vue';

import type { HomePageFilters } from '../../types';

import { DEFAULT_HOME_PAGE_FILTERS } from '../../constants';
import {
  bodyTypeItems,
  brandItems,
  carsFiltersFormSchema,
  colorOptions,
  PRICE_MAX,
  PRICE_MIN,
  transmissionOptions
} from './constants';

interface CarsFiltersDrawerProps {
  filters: HomePageFilters;
}
const props = defineProps<CarsFiltersDrawerProps>();

const emit = defineEmits<CarsFiltersDrawerEmits>();

const opened = ref(false);

interface CarsFiltersDrawerEmits {
  onReset: [];
  onSubmit: [filters: HomePageFilters];
}
const carsFiltersForm = useForm<HomePageFilters>({
  validationSchema: carsFiltersFormSchema,
  initialValues: props.filters
});

watch(opened, (isOpen) => {
  if (isOpen) carsFiltersForm.resetForm({ values: props.filters });
});

const onSubmit = carsFiltersForm.handleSubmit((values) => {
  emit('onSubmit', values);
  opened.value = false;
});

const onReset = () => {
  carsFiltersForm.resetForm({ values: DEFAULT_HOME_PAGE_FILTERS });
  emit('onReset');
  opened.value = false;
};
</script>

<template>
  <UDrawer v-model:open="opened" direction="right" :handle="false" title="Фильтры">
    <UButton variant="solid" @click="opened = true"> Фильтры </UButton>
    <template #content>
      <form class="flex flex-col gap-6 p-6 w-[476px] rounded-3xl h-full" @submit="onSubmit">
        <p class="text-2xl font-semibold">Фильтры</p>

        <VeeField v-slot="{ value, handleChange }" name="brand">
          <UFormField label="Марка">
            <USelect
              :model-value="value"
              :items="brandItems"
              value-key="value"
              placeholder="Выберите марку"
              class="w-full"
              @update:model-value="handleChange"
            />
          </UFormField>
        </VeeField>

        <VeeField v-slot="{ value, handleChange }" name="bodyType">
          <UFormField label="Тип кузова">
            <USelect
              :model-value="value"
              :items="bodyTypeItems"
              value-key="value"
              placeholder="Выберите тип кузова"
              class="w-full"
              @update:model-value="handleChange"
            />
          </UFormField>
        </VeeField>

        <VeeField v-slot="{ value, handleChange }" name="transmission">
          <UFormField label="Коробка передач">
            <div class="flex rounded-full bg-gray-100 p-1 gap-1">
              <button
                v-for="option in transmissionOptions"
                :key="option.label"
                type="button"
                class="flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                :class="
                  value === option.value
                    ? 'bg-white shadow text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                "
                @click="handleChange(option.value)"
              >
                {{ option.label }}
              </button>
            </div>
          </UFormField>
        </VeeField>

        <div>
          <p class="mb-3 text-xl font-semibold">Стоимость</p>
          <div class="flex gap-3 mb-4">
            <VeeField v-slot="{ value, handleChange }" name="minPrice">
              <UFormField label="От" class="flex-1">
                <UInput
                  :model-value="value"
                  type="number"
                  placeholder="0 руб."
                  @update:model-value="handleChange"
                />
              </UFormField>
            </VeeField>
            <VeeField v-slot="{ value, handleChange }" name="maxPrice">
              <UFormField label="До" class="flex-1">
                <UInput
                  :model-value="value"
                  type="number"
                  placeholder="20 000 руб."
                  @update:model-value="handleChange"
                />
              </UFormField>
            </VeeField>
          </div>
          <p class="text-red-600 text-xl mb-2">DO NOT TUCH</p>
          <USlider
            :model-value="[
              Number(carsFiltersForm.values.minPrice) ?? PRICE_MIN,
              Number(carsFiltersForm.values.maxPrice) ?? PRICE_MAX
            ]"
            :min="PRICE_MIN"
            :max="PRICE_MAX"
            :step="10000"
            :min-steps-between-thumbs="1"
            @update:model-value="
              (value) => {
                if (!value) return;
                carsFiltersForm.setFieldValue('minPrice', String(value[0]));
                carsFiltersForm.setFieldValue('maxPrice', String(value[1]));
              }
            "
          />
        </div>

        <VeeField v-slot="{ value, handleChange }" name="color">
          <UFormField label="Цвет">
            <div class="flex items-center gap-3">
              <UPopover>
                <UButton label="Цвет" variant="outline">
                  <template #leading>
                    <span :style="{ backgroundColor: value }" class="size-3 rounded-full" />
                  </template>
                </UButton>

                <template #content>
                  <UColorPicker
                    :model-value="value"
                    class="p-2"
                    @update:model-value="handleChange"
                  />
                </template>
              </UPopover>
              <button
                v-for="colorOption in colorOptions"
                :key="colorOption.value"
                type="button"
                class="size-10 rounded-full border-2 transition-all border-gray-300"
                :style="{ backgroundColor: colorOption.hex }"
                @click="handleChange(value === colorOption.value ? '' : colorOption.value)"
              />
            </div>
          </UFormField>
        </VeeField>

        <div class="flex gap-3 mt-auto pt-4">
          <UButton type="button" variant="soft" class="flex-1 justify-center" @click="onReset">
            Сбросить фильтры
          </UButton>
          <UButton type="submit" class="flex-1 justify-center"> Найти </UButton>
        </div>
      </form>
    </template>
  </UDrawer>
</template>
