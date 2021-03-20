import authActions from "../actions/authActions";
import authMutations from "../mutations/authMutations";

const authModule = {
  state: () => ({
    profile: {
      email: "",
      login: "",
      id: ""
    },
    isAuth: false,
    errors: []
  }),
  mutations: authMutations,
  actions: authActions,
  getters: {
    errorsList: state => state.errors,
    isAuth: state => state.isAuth,
    userID: state => state.profile.id,
    profile: state => state.profile
  }
};

export default authModule;
