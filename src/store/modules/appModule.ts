import AppState from "@/models/store";
import appMutations from "../mutations/appMutations";

const appModule = {
  state: () => (<AppState>{
    isLogin: false,
    isModalDelete: false,
    isModalWords: false,
    isModalSections: false,
    startModalWords: null
  }),
  mutations: appMutations,
  actions: {},
  getters: {
    loginInfo: (state: AppState): boolean => state.isLogin,
    deleteModal: (state: AppState): boolean => state.isModalDelete,
    isModalWords: (state: AppState): boolean => state.isModalWords,
    startModalWords: (state: AppState) => state.startModalWords,
    modalSections: (state: AppState) => state.isModalSections
  }
};

export default appModule;
