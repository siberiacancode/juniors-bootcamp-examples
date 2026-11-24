<script setup lang="ts">
import { useCountdown, useLocalStorage } from '@vueuse/core';
import { ChevronLeftIcon } from 'lucide-vue-next';
import { useForm, Field as VeeField } from 'vee-validate';
import { useRouter } from 'vue-router';

import { Logo } from '@/components';
import { usePostAuthOtpMutation, usePostUsersSigninMutation } from '@/generated/api';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/utils/constants';

import { otpFormSchema } from './constants';

interface OtpFormProps {
  phone: string;
  retryDelay: number;
}
const props = defineProps<OtpFormProps>();

const emits = defineEmits<OtpFormEmits>();
interface OtpFormEmits {
  onBack: [];
}
const router = useRouter();
const postUsersSigninMutation = usePostUsersSigninMutation();
const postAuthOtpMutation = usePostAuthOtpMutation();

const localStorageToken = useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, '');
const countdown = useCountdown(props.retryDelay / 1_000, { immediate: true });

const otpForm = useForm({
  validationSchema: otpFormSchema,
  initialValues: { otp: '' }
});

const onRetry = async () => {
  const postAuthOtpMutationResponse = await postAuthOtpMutation.mutateAsync({
    body: { phone: props.phone }
  });
  if (!postAuthOtpMutationResponse.success) return;

  countdown.start(postAuthOtpMutationResponse.data.retryDelay / 1_000);
};

const onSubmit = otpForm.handleSubmit(async (values) => {
  const postUsersSigninMutationResponse = await postUsersSigninMutation.mutateAsync({
    body: { code: +values.otp, phone: props.phone }
  });
  if (!postUsersSigninMutationResponse.success) return;

  localStorageToken.value = postUsersSigninMutationResponse.data.token;
  router.push(ROUTES.HOME);
});
</script>
<template>
  <div class="flex flex-col gap-4 w-[280px] items-center">
    <Logo />
    <div class="w-full flex items-center justify-center gap-3 self-start">
      <UButton variant="ghost" @click="emits('onBack')">
        <ChevronLeftIcon class="size-6" />Проверочный код
      </UButton>
    </div>
    <p variant="body">На указанный вами номер был отправлен проверочный код</p>
    <form class="w-full flex flex-col gap-6" @submit="onSubmit">
      <VeeField v-slot="{ field, errors }" name="otp">
        <UFormField label="Проверочный код" :error="errors.length ? errors.join() : undefined">
          <UInput class="w-full" v-bind="field" placeholder="000000" />
        </UFormField>
      </VeeField>
      <UButton class="w-full justify-center" type="submit"> Войти </UButton>
      <p v-if="countdown.remaining.value > 0" class="text-sm">
        Отправить код повторно через {{ countdown.remaining.value.toFixed(0) }} сек
      </p>
      <UButton
        v-if="countdown.remaining.value === 0"
        class="w-full justify-center"
        @click="onRetry"
      >
        Отправить код повторно
      </UButton>
    </form>
  </div>
</template>
