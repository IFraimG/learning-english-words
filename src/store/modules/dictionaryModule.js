import firebase from "firebase/app"
require("firebase/database")

export default {
  state: () => ({
    dictionaryList: [],
    currentDictionary: []
  }),
  mutations: {
    SET_DICTIONARY(state, payload) {
      state.dictionaryList = payload
    },
    SET_CURRENT_DICTIONARY(state, payload) {
      state.currentDictionary = payload
    }
  },
  actions: {
    async getDictionaryWords({commit}, payload) {
      let data = await firebase.database().ref(`/users/${payload}/dictionary`).once("value")
      commit("SET_DICTIONARY", data.val())
    },
    async getCurrentDictionaryWords({commit}, payload) {
      let data = await firebase.database().ref(`/users/${payload.id}/dictionary/${payload.query - 1}`).once("value")
      commit("SET_CURRENT_DICTIONARY", data.val())
    },
    async addDictionaryWords({ dispatch }, payload) {
      await firebase.database().ref(`/users/${payload.id}/dictionary`).set(payload.words)
      dispatch("getDictionaryWords", payload.id)
    },
  },
  getters: {
    currentDictionary: state => state.currentDictionary,
    dictionaryList: state => state.dictionaryList,
    pagesDictionary: state => state.dictionaryList.length
  }
}