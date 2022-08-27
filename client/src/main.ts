import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router/index';

import 'drawflow/dist/drawflow.min.css';
import './assets/main.scss';
import './assets/variables.scss';
import './assets/drawflow.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
