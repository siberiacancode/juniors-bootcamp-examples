<script setup lang="ts">
import { vMaska } from 'maska/vue';
import { useForm, Field as VeeField } from 'vee-validate';

import { Logo } from '@/components';
import { usePostAuthOtpMutation } from '@/generated/api';

import { phoneFormSchema } from './constants';

interface PhoneFormEmits {
  (event: 'onSubmit', phone: string, retryDelay: number): void;
}
const emit = defineEmits<PhoneFormEmits>();

const postAuthOtpMutation = usePostAuthOtpMutation();

const phoneForm = useForm({
  validationSchema: phoneFormSchema,
  initialValues: { phone: '' }
});

const onSubmit = phoneForm.handleSubmit(async (values) => {
  const postAuthOtpMutationResponse = await postAuthOtpMutation.mutateAsync({ body: values });
  if (!postAuthOtpMutationResponse.success) return;

  emit('onSubmit', values.phone, postAuthOtpMutationResponse.data.retryDelay);
});
</script>
<template>
  <div class="flex flex-col gap-4 w-[280px] items-center">
    <Logo />
    <h2 class="font-bold text-2xl">Авторизация</h2>
    <p>Введите номер телефона для входа в свой профиль</p>
    <form class="w-full flex flex-col gap-6" @submit="onSubmit">
      <VeeField v-slot="{ field, errors }" name="phone">
        <UFormField
          class="w-full"
          label="Телефон"
          :error="errors.length ? errors.join() : undefined"
        >
          <UInput
            v-maska="'+7 (###) ###-##-##'"
            v-bind="field"
            class="w-full"
            placeholder="+7 (___) ___-__-__"
            type="tel"
          />
        </UFormField>
      </VeeField>
      <UButton class="w-full justify-center" type="submit"> Войти </UButton>
    </form>
  </div>
</template>
