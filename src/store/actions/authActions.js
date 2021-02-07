import router from "@/router/index"
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

const authActions = {
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
}

export default authActions;