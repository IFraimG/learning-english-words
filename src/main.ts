import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { firebase } from "@firebase/app";
import "./configs/root.scss"

const configOptions = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

firebase.initializeApp(configOptions);

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

// app.config.globalProperties.$firebase = firebase

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $validate: (data: object, rule: object) => boolean
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    isAdmin?: boolean
    requiresAuth: boolean
  }
}