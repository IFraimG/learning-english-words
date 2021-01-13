import router from "@/router/index"
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

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
  actions: {
    async login({ commit }, payload) {
      try {
        let data = await firebase.default
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        commit("SET_PROFILE", {
          email: data.user.email,
          login: data.user.displayName,
          id: data.user.uid,
        });
        router.push("/account");
      } catch (error) {
        commit("SET_ERRORS", error.message);
      }
    },
    async registration({ commit }, payload) {
      try {
        let data = await firebase.default
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        await data.user.updateProfile({ displayName: payload.login });
      } catch (error) {
        commit("SET_ERRORS", error.message);
      }
    },
    checkUser({ commit }) {
      try {
        firebase.default.auth().onAuthStateChanged((user) => {
          if (user == null) commit("SET_AUTH", false);
          else {
            commit("SET_PROFILE", {
              email: user.email,
              login: user.displayName,
            });
            commit("SET_AUTH", true);
          }
        });
      } catch (error) {
        commit("SET_ERRORS", error.message);
      }
    },
    async logout({ commit }) {
      try {
        await firebase.default.auth().signOut();
        router.push("/");
      } catch (error) {
        commit("SET_ERRORS", error.message);
      }
    },
  },
  getters: {
    errorsList: (state) => state.errors,
    isAuth: (state) => state.isAuth,
    userID: (state) => state.profile.id,
  },
};

export default authModule