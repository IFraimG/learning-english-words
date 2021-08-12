import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./configs/root.scss"
import "./configs/firebase"
import "./registerServiceWorker";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
