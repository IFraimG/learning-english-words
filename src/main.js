import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { firebase } from "@firebase/app";

const configOptions = {
  apiKey: "AIzaSyBla6tQ_SA6gT3Pf9JKKXDZeKEpmyuhF2Q",
  authDomain: "myocean-english-project.firebaseapp.com",
  projectId: "myocean-english-project",
  storageBucket: "myocean-english-project.appspot.com",
  messagingSenderId: "197125702152",
  appId: "1:197125702152:web:d63a8473f3069f843d47bd",
  measurementId: "G-XMG88ND0QY"
};

firebase.initializeApp(configOptions)
// const db = firebaseApp.firestore()

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
