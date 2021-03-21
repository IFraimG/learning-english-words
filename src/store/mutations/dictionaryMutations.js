const dictionaryMutations = {
  SET_DICTIONARY(state, payload) {
    state.dictionaryList = [{}, ...payload];
    state.currentDictionary = payload[0];
  },
  SET_CURRENT_DICTIONARY(state, payload) {
    state.currentDictionary = payload;
  }
};

export default dictionaryMutations;
