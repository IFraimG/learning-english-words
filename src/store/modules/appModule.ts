import AppState from "@/models/store";
import appMutations from "../mutations/appMutations";

const appModule = {
  state: () => (<AppState>{
    isLogin: false,
    startModalWords: { title: null, words: null }
  }),
  mutations: appMutations,
  actions: {},
  getters: {
    loginInfo: (state: AppState): boolean => state.isLogin,
    startModalWords: (state: AppState) => state.startModalWords
  }
};

export default appModule;
