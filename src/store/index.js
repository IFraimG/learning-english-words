import { createStore } from "vuex";
import authModule from "./modules/authModule";
import appModule from "./modules/appModule";
import wordsModule from "./modules/wordsModule";
import dictionaryModule from "./modules/dictionaryModule";

const store = createStore({
  modules: {
    auth: authModule,
    app: appModule,
    words: wordsModule,
    dictionary: dictionaryModule
  }
});

export default store;