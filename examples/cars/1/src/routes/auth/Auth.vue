<script setup lang="ts">
import { ref } from 'vue';

import { OtpForm, PhoneForm } from './components';

const stage = ref<'otp' | 'phone'>('phone');
const phone = ref<string>('');
const retryDelay = ref<number>(0);

const onPhoneSubmit = (newPhone: string, newRetryDelay: number) => {
  phone.value = newPhone;
  retryDelay.value = newRetryDelay;
  stage.value = 'otp';
};
</script>

<template>
  <PhoneForm v-if="stage === 'phone'" @on-submit="onPhoneSubmit" />
  <OtpForm
    v-if="stage === 'otp'"
    :retry-delay="retryDelay"
    :phone="phone"
    @on-back="stage = 'phone'"
  />
</template>
