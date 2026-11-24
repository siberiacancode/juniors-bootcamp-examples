import ui from '@nuxt/ui/vue-plugin';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';

import App from './App.vue';
import { queryClient } from './utils/plugins/queryClient';
import { router } from './utils/plugins/router';

import './style.css';

const app = createApp(App);
app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.use(ui as any);
app.mount('#app');
