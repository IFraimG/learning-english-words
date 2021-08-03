import AppState from "@/models/store";
import appMutations from "../mutations/appMutations";

const appModule = {
  state: () => ({
    isLogin: false,
    startModalWords: { title: null, words: null }
  } as AppState),
  mutations: appMutations,
  getters: {
    loginInfo: (state: AppState): boolean => state.isLogin,
    startModalWords: (state: AppState) => state.startModalWords
  }
};

export default appModule;
