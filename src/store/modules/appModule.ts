import AppState from "@/models/store";
import appMutations from "../mutations/appMutations";

const appModule = {
  state: () => (<AppState>{
    isLogin: false,
    isModalDelete: false,
    isModalWords: false
  }),
  mutations: appMutations,
  actions: {},
  getters: {
    loginInfo: (state: AppState): boolean => state.isLogin,
    deleteModal: (state: AppState): boolean => state.isModalDelete,
    isModalWords: (state: AppState): boolean => state.isModalWords
  }
};

export default appModule;
