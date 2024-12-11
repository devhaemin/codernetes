import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';
import axios from './utils/axios';

// Create Vue app
const app = createApp(App);

// Install plugins
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

// Register Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// Global properties
app.config.globalProperties.$axios = axios;

// Mount app
app.mount('#app'); 