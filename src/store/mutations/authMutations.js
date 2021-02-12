const authMutations = {
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
  }
}

export default authMutations;