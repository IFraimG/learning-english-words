import AppState from "@/models/store"
import appActions from "../actions/appActions"
import appMutations from "../mutations/appMutations"

const appModule = {
  state(): AppState {
    return {
      isLogin: false,
      startModalWords: { title: null, words: null },
    }
  },
  mutations: appMutations,
  actions: appActions,
  getters: {
    loginInfo: (state: AppState): boolean => state.isLogin,
    startModalWords: (state: AppState) => state.startModalWords,
  },
}

export default appModule
