<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { useLocalStorage } from '@vueuse/core';
import { vMaska } from 'maska/vue';
import { useForm, Field as VeeField } from 'vee-validate';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

import {
  getUsersSessionQueryKey,
  useGetUsersSessionQuery,
  usePatchUsersProfileMutation
} from '@/generated/api';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants';

import { profileFormSchema } from './constants';

const router = useRouter();
const queryClient = useQueryClient();
const localStorageToken = useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, '');

const getUsersSessionQuery = useGetUsersSessionQuery();
const patchUsersProfileMutation = usePatchUsersProfileMutation();

const user = computed(() =>
  getUsersSessionQuery.data.value?.success ? getUsersSessionQuery.data.value.data.user : undefined
);
const profileForm = useForm({
  validationSchema: toTypedSchema(profileFormSchema),
  initialValues: {}
});
watch(user, () => {
  profileForm.resetForm({ values: user.value });
});

const onSubmit = profileForm.handleSubmit(async (values) => {
  const patchProfileMutationResponse = await patchUsersProfileMutation.mutateAsync({
    body: {
      phone: values.phone,
      profile: values
    }
  });
  if (!patchProfileMutationResponse.success) return;

  toast.success('Данные профиля обновлены');
  queryClient.invalidateQueries({ queryKey: [getUsersSessionQueryKey] });
});

const onLogout = () => {
  localStorageToken.value = '';
  router.push(ROUTES.AUTH);
};
</script>

<template>
  <div class="flex flex-col gap-8 px-30 py-16">
    <p class="text-2xl font-bold">Профиль</p>

    <form v-if="user" class="flex w-[1200px] flex-row items-start gap-12" @submit="onSubmit">
      <div class="flex flex-1 flex-col gap-6">
        <VeeField v-slot="{ field, errors }" name="lastname">
          <UFormField label="Фамилия" :error="errors[0]">
            <UInput v-bind="field" size="xl" class="w-full" :ui="{ base: 'rounded-full' }" />
          </UFormField>
        </VeeField>

        <VeeField v-slot="{ field, errors }" name="firstname">
          <UFormField label="Имя" :error="errors[0]">
            <UInput v-bind="field" size="xl" class="w-full" :ui="{ base: 'rounded-full' }" />
          </UFormField>
        </VeeField>

        <VeeField v-slot="{ field, errors }" name="middlename">
          <UFormField label="Отчество" :error="errors[0]">
            <UInput v-bind="field" size="xl" class="w-full" :ui="{ base: 'rounded-full' }" />
          </UFormField>
        </VeeField>

        <div class="mt-2 flex flex-col gap-3">
          <UButton
            type="submit"
            color="neutral"
            variant="soft"
            size="xl"
            block
            class="rounded-full"
            :loading="patchUsersProfileMutation.isPending.value"
          >
            Обновить данные
          </UButton>
          <UButton
            type="button"
            color="neutral"
            size="xl"
            block
            class="rounded-full"
            @click="onLogout"
          >
            Выйти
          </UButton>
        </div>
      </div>

      <div class="flex flex-1 flex-col gap-6">
        <VeeField v-slot="{ field, errors }" name="phone">
          <UFormField label="Телефон" :error="errors[0]">
            <UInput
              v-maska="'+7 ### ### ## ##'"
              v-bind="field"
              size="xl"
              type="tel"
              class="w-full"
              :ui="{ base: 'rounded-full' }"
            />
          </UFormField>
        </VeeField>

        <VeeField v-slot="{ field, errors }" name="email">
          <UFormField label="Email" :error="errors[0]">
            <UInput
              v-bind="field"
              size="xl"
              type="email"
              placeholder="Email"
              class="w-full"
              :ui="{ base: 'rounded-full' }"
            />
          </UFormField>
        </VeeField>

        <VeeField v-slot="{ field, errors }" name="city">
          <UFormField label="Город" :error="errors[0]">
            <UInput v-bind="field" size="xl" class="w-full" :ui="{ base: 'rounded-full' }" />
          </UFormField>
        </VeeField>
      </div>
    </form>
  </div>
</template>
