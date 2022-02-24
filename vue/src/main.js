/* import "@viur/viur-shoelace/dist/themes/light.css"; */
import "@viur/viur-shoelace/dist/themes/light.css";
//import "@viur/viur-shoelace/dist/themes/viur.css";
import "@viur/viur-shoelace/dist/components/dropdown/dropdown.js";
import "@viur/viur-shoelace/dist/components/menu/menu.js";
import "@viur/viur-shoelace/dist/components/icon/icon.js";
import "@viur/viur-shoelace/dist/components/icon/icon.styles";
import "@viur/viur-shoelace/dist/shoelace.js";
import "@viur/viur-shoelace/dist/themes/dark.css";

import "animate.css";

import config from "@/config.js"

import { createApp } from "vue";
//import { createStore } from 'vuex';

import App from "./App.vue";
import router from "./router";
import Socketio from '@/plugins/Socket.js';
import "@/theme.js";
import { store } from '@/store';

import { setBasePath } from '@viur/viur-shoelace/dist/utilities/base-path';
setBasePath('https://cdn.jsdelivr.net/npm/@viur/viur-shoelace@2.0.0-beta.62-viur-1/dist');
///setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.62/dist/');


const app = createApp(App).use(router);

app.use(Socketio, {
    debug: true,
    connection: config.apiUrl, //options object is Optional
  }
);
app.use(store); 

app.mount("#app");

