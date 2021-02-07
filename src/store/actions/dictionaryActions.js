import firebase from "firebase/app";
require("firebase/database");

const dictionaryActions = {
  async getDictionaryWords({ commit }, payload) {
    let data = await firebase
      .database()
      .ref(`/users/${payload}/dictionary`)
      .once("value");
    commit("SET_DICTIONARY", data.val());
  },
  async getCurrentDictionaryWords({ commit }, payload) {
    commit("SET_LOADER", true);
    let data = await firebase
      .database()
      .ref(`/users/${payload.id}/dictionary/${payload.query - 1}`)
      .once("value");
    commit("SET_CURRENT_DICTIONARY", data.val());
    commit("SET_LOADER", false);
  },
  async addDictionaryWords({ dispatch }, payload) {
    await firebase
      .database()
      .ref(`/users/${payload.id}/dictionary`)
      .set(payload.words);
    dispatch("getDictionaryWords", payload.id);
  },
};

export default dictionaryActions;
