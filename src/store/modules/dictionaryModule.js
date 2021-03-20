import dictionaryActions from "../actions/dictionaryActions";
import dictionaryMutations from "../mutations/dictionaryMutations";

export default {
  state: () => ({
    dictionaryList: [],
    currentDictionary: []
  }),
  mutations: dictionaryMutations,
  actions: dictionaryActions,
  getters: {
    currentDictionary: state => state.currentDictionary,
    dictionaryList: state => state.dictionaryList,
    pagesDictionary: state => state.dictionaryList?.length
  }
};
