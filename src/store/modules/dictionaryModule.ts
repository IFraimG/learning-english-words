import { DictionaryState } from '@/models/dictionary';
import dictionaryActions from "../actions/dictionaryActions";
import dictionaryMutations from "../mutations/dictionaryMutations";

export default {
  state: () => (<DictionaryState>{
    dictionaryList: [],
    currentDictionary: []
  }),
  mutations: dictionaryMutations,
  actions: dictionaryActions,
  getters: {
    currentDictionary: (state: DictionaryState) => state.currentDictionary,
    dictionaryList: (state: DictionaryState) => state.dictionaryList,
    pagesDictionary: (state: DictionaryState) => state.dictionaryList?.length
  }
};
