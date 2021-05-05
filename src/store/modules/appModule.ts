import AppState from "@/models/store";

const appModule = {
  state: () => ({
    isLogin: false,
    isModalDelete: false
  } as AppState),
  mutations: {
    setLogin(state: AppState, payload: boolean) {
      state.isLogin = payload;
    },
    HANDLER_MODAL_DELETE(state: AppState, payload: boolean) {
      state.isModalDelete = payload;
    }
  },
  actions: {},
  getters: {
    loginInfo: (state: AppState): boolean => state.isLogin,
    deleteModal: (state: AppState): boolean => state.isModalDelete
  }
};

export default appModule;
