import AppState from "@/models/store";
import appMutations from "../mutations/appMutations";

const appModule = {
  state: () => ({
    isLogin: false,
    startModalWords: { title: null, words: null }
  } as AppState),
  mutations: appMutations,
  actions: {
    setTheme(_: any, payload: any) {
      if (payload) {
        localStorage.setItem("theme", "dark")
        document.body.setAttribute("data-theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
        document.body.setAttribute("data-theme", "light")
      }
    }
  },
  getters: {
    loginInfo: (state: AppState): boolean => state.isLogin,
    startModalWords: (state: AppState) => state.startModalWords
  }
};

export default appModule;
