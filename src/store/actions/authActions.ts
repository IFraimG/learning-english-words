import { loginAuthIT } from "@/models/auth"
import router from "@/router/index"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const authActions = {
  async login({ commit }: any, payload: loginAuthIT) {
    try {
      const data: any = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      commit("SET_PROFILE", {
        email: data.user.email,
        login: data.user.displayName,
        id: data.user.uid,
      })
      router.push("/account/" + data.user.uid)
    } catch (error: any) {
      commit("SET_ERRORS", error.message)
    }
  },
  async registration({ commit }: any, payload: loginAuthIT) {
    try {
      if (payload.login.length > 40) commit("SET_ERRORS", "Слишком большое количество символов в логине!")
      else if (payload.password.length < 7) commit("SET_ERRORS", "Слишком маленький пароль!")
      else {
        const data: any = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        await data.user.updateProfile({ displayName: payload.login })
        await firebase
          .database()
          .ref(`users/${data.user.uid}`)
          .set({ dictionary: [], words: [], email: data.user.email, login: data.user.displayName })
        commit("SET_PROFILE", {
          email: data.user.email,
          login: data.user.displayName,
          id: data.user.uid,
        })
        router.push("/account/" + data.user.uid)
      }
    } catch (error: any) {
      commit("SET_ERRORS", error.message)
    }
  },
  async logout({ commit }: any) {
    try {
      await firebase.auth().signOut()
      window.location.reload()
    } catch (error: any) {
      commit("SET_ERRORS", error.message)
    }
  },
}

export default authActions
