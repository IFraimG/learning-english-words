import { loginAuthIT } from '@/models/auth';
import router from "@/router/index";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const authActions = {
  async login({ commit }: any, payload: loginAuthIT) {
    try {
      let data: any = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      commit("SET_PROFILE", {
        email: data.user.email,
        login: data.user.displayName,
        id: data.user.uid
      });
      router.push("/account");
    } catch (error) {
      commit("SET_ERRORS", error.message);
    }
  },
  async registration({ commit }: any, payload: loginAuthIT) {
    try {
      let data: any = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);
      await data.user.updateProfile({ displayName: payload.login });
      await firebase
        .database()
        .ref(`users/${data.user.uid}`)
        .set({ dictionary: [], words: [], email: data.user.email, login: data.user.displayName })
      commit("SET_PROFILE", {
        email: data.user.email,
        login: data.user.displayName,
        id: data.user.uid
      });
      router.push("/account");
    } catch (error) {
      commit("SET_ERRORS", error.message);
    }
  },
  checkUser({ commit }: any) {
    try {
      firebase.auth().onAuthStateChanged(user => {
        if (user == null) commit("SET_AUTH", false);
        else {
          commit("SET_PROFILE", {
            email: user.email,
            login: user.displayName
          });
          commit("SET_AUTH", true);
        }
      });
    } catch (error) {
      commit("SET_ERRORS", error.message);
    }
  },
  async logout({ commit }: any) {
    try {
      await firebase.auth().signOut();
      router.push("/");
    } catch (error) {
      commit("SET_ERRORS", error.message);
    }
  }
};

export default authActions;
