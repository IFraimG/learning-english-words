import { createStore } from "vuex";
import authModule from "./modules/authModule";
import appModule from "./modules/appModule";
import wordsModule from "./modules/wordsModule";

const store = createStore({
  modules: {
    auth: authModule,
    app: appModule,
    words: wordsModule
  }
});

export default store;