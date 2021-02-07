import dictionaryActions from "../actions/dictionaryActions"

export default {
  state: () => ({
    dictionaryList: [],
    currentDictionary: []
  }),
  mutations: {
    SET_DICTIONARY(state, payload) {
      state.dictionaryList = payload
      state.currentDictionary = payload[0]
    },
    SET_CURRENT_DICTIONARY(state, payload) {
      state.currentDictionary = payload
    }
  },
  actions: dictionaryActions,
  getters: {
    currentDictionary: state => state.currentDictionary,
    dictionaryList: state => state.dictionaryList,
    pagesDictionary: state => state.dictionaryList?.length
  }
}