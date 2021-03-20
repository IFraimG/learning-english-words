const appModule = {
  state: () => ({
    isLogin: false,
    isModalDelete: false
  }),
  mutations: {
    setLogin(state, payload) {
      state.isLogin = payload;
    },
    HANDLER_MODAL_DELETE(state, payload) {
      state.isModalDelete = payload;
    }
  },
  actions: {},
  getters: {
    loginInfo: state => state.isLogin,
    deleteModal: state => state.isModalDelete,
  }
};

export default appModule;
