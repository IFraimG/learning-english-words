import { createStore } from "vuex";
import authModule from "./modules/authModule";
import appModule from "./modules/appModule";
import wordsModule from "./modules/wordsModule";
import dictionaryModule from "./modules/dictionaryModule";

const vuexPlugin = store => {
  store.subscribe(() => {})
}

const store = createStore({
  modules: {
    auth: authModule,
    app: appModule,
    words: wordsModule,
    dictionary: dictionaryModule
  },
  plugins: [vuexPlugin]
});

export default store;
