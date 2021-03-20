import dictionaryAPI from "../api/dictionaryAPI";

const dictionaryActions = {
  async getDictionaryWords({ commit }, payload) {
    try {
      let data = await dictionaryAPI.getWords(payload)
      commit("SET_DICTIONARY", data);
    } catch (error) {
      console.log(error);
    }
  },
  async getCurrentDictionaryWords({ commit }, payload) {
    commit("SET_LOADER", true);
    let data = await dictionaryAPI.getCurrentWords(payload.id, payload.query)
    commit("SET_CURRENT_DICTIONARY", data);
    commit("SET_LOADER", false);
  },
  async addDictionaryWords({ dispatch }, payload) {
    await dictionaryAPI.updateWords(payload.id, payload.words)
    dispatch("getDictionaryWords", payload.id);
  },
  async saveDitionaryTranscription({ dispatch }, payload) {
    await dictionaryAPI.saveTranscripton(payload.userID, payload.query, payload.wordIndex, payload.wordData)
    dispatch("getCurrentDictionaryWords", {id: payload.userID, query: payload.query})
  }
};

export default dictionaryActions;
