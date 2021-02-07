import authActions from "../actions/authActions";

const authModule = {
  state: () => ({
    profile: {
      email: "",
      login: "",
      id: "",
    },
    isAuth: false,
    errors: [],
  }),
  mutations: {
    SET_ERRORS(state, payload) {
      state.errors.push(payload);
    },
    SET_PROFILE(state, payload) {
      state.profile.email = payload.email;
      state.profile.login = payload.login;
      state.profile.id = payload.id;
    },
    SET_AUTH(state, payload) {
      state.isAuth = payload;
    },
  },
  actions: authActions,
  getters: {
    errorsList: (state) => state.errors,
    isAuth: (state) => state.isAuth,
    userID: (state) => state.profile.id,
    profile: (state) => state.profile
  },
};

export default authModule