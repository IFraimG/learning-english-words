const appModule = {
  state: () => ({
    isLogin: false
  }),
  mutations: {
    setLogin(state, payload) {
      state.isLogin = payload
    }
  },
  actions: {},
  getters: {
    loginInfo: state => state.isLogin
  }
}

export default appModule;