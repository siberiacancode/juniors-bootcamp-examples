<script setup lang="ts">
import { ru } from '@nuxt/ui/locale';
import { useLocalStorage } from '@vueuse/core';
import { HistoryIcon, UserIcon } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import { Toaster } from 'vue-sonner';

import { Logo } from './components';
import { LOCAL_STORAGE_KEYS, ROUTES } from './utils/constants';

import 'vue-sonner/style.css';

const localStorageToken = useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, '');
</script>

<template>
  <UApp :locale="ru">
    <Toaster position="bottom-right" />
    <div
      v-if="!localStorageToken.length"
      class="flex flex-col items-center justify-center h-full overflow-y-auto"
    >
      <RouterView />
    </div>
    <div v-if="localStorageToken.length" class="flex flex-col items-center h-full py-6 px-5">
      <header class="border-b border-primary py-5 px-3 w-full mb-6">
        <div class="flex justify-between items-center">
          <RouterLink :to="ROUTES.HOME">
            <Logo />
          </RouterLink>
          <div class="flex items-center gap-4">
            <RouterLink :to="ROUTES.HISTORY">
              <UButton variant="outline" class="rounded-full">
                <HistoryIcon class="size-5" />
              </UButton>
            </RouterLink>
            <RouterLink :to="ROUTES.PROFILE">
              <UButton variant="outline" class="rounded-full">
                <UserIcon class="size-5" />
              </UButton>
            </RouterLink>
          </div>
        </div>
      </header>
      <main class="overflow-y-auto w-full max-h-full">
        <RouterView />
      </main>
    </div>
  </UApp>
</template>
