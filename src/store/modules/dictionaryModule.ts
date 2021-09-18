import { WordInterface } from '@/models/words';
import { DictionaryState } from "@/models/dictionary"
import dictionaryActions from "../actions/dictionaryActions"
import dictionaryMutations from "../mutations/dictionaryMutations"

export default {
  state(): DictionaryState {
    return {
      dictionaryList: [],
      currentDictionary: null,
    }
  },
  mutations: dictionaryMutations,
  actions: dictionaryActions,
  getters: {
    currentDictionary: (state: DictionaryState) => state.currentDictionary,
    dictionaryList: (state: DictionaryState) => state.dictionaryList,
    pagesDictionary: (state: DictionaryState) => state.dictionaryList?.length,
    sortedWords: (state: DictionaryState): WordInterface[] => {
      if (state.currentDictionary == null) return []
      return [...state.currentDictionary.words].sort((a, b) => a.english.charCodeAt(0) - b.english.charCodeAt(0))
    },
  },
}
