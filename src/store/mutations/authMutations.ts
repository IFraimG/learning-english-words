import AuthInterface, { profileAuth } from "@/models/auth"

const authMutations = {
  SET_ERRORS(state: AuthInterface, payload: any) {
    state.errors.push(payload)
  },
  SET_PROFILE(state: AuthInterface, payload: profileAuth) {
    state.profile.email = payload.email
    state.profile.login = payload.login
    state.profile.id = payload.id
  },
  SET_AUTH(state: AuthInterface, payload: boolean) {
    state.isAuth = payload
  },
}

export default authMutations
