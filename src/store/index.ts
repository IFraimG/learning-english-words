import { createStore } from "vuex"
import authModule from "./modules/authModule"
import appModule from "./modules/appModule"
import wordsModule from "./modules/wordsModule"
import dictionaryModule from "./modules/dictionaryModule"
import foldersModule from "./modules/foldersModule"
import usersModule from "./modules/usersModule"

// const vuexPlugin = (store: any) => {
//   store.subscribe(() => {});
// };

const store = createStore({
  modules: {
    auth: authModule,
    app: appModule,
    words: wordsModule,
    dictionary: dictionaryModule,
    folders: foldersModule,
    users: usersModule,
  },
})

export default store
