import AuthInterface from "./../../models/auth"
import authActions from "../actions/authActions"
import authMutations from "../mutations/authMutations"

const authModule = {
  state(): AuthInterface {
    return {
      profile: {
        email: "",
        login: "",
        id: "",
      },
      isAuth: false,
      errors: [],
      isMyUser: false,
      profileOtherUser: {
        email: "",
        login: "",
        id: "",
      }
    }
  },
  mutations: authMutations,
  actions: authActions,
  getters: {
    errorsList: (state: AuthInterface) => state.errors,
    isAuth: (state: AuthInterface) => state.isAuth,
    userID: (state: AuthInterface) => state.profile.id,
    profile: (state: AuthInterface) => state.profile,
    isMyUser: (state: AuthInterface) => state.isMyUser,
    profileOtherUser: (state: AuthInterface) => state.profileOtherUser,
  },
}

export default authModule
