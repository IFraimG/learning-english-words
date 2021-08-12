import AppState from "@/models/store";
import appMutations from "../mutations/appMutations";

const appModule = {
  state(): AppState {
    return {
      isLogin: false,
      startModalWords: { title: null, words: null }
    }
  },
  mutations: appMutations,
  actions: {
    setTheme(_: any, payload: any) {
      localStorage.setItem("theme", payload)
      document.body.setAttribute("data-theme", payload)
    }
  },
  getters: {
    loginInfo: (state: AppState): boolean => state.isLogin,
    startModalWords: (state: AppState) => state.startModalWords
  }
};

export default appModule;
