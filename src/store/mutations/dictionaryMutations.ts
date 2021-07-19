import { WordInterface } from '@/models/words';
import { DictionaryState } from "@/models/dictionary";

const dictionaryMutations = {
  SET_DICTIONARY(state: DictionaryState, payload: any[]) {
    // state.dictionaryList = [{}, ...payload];
    state.dictionaryList = payload;
    state.currentDictionary = payload[0];
  },
  SET_CURRENT_DICTIONARY(state: DictionaryState, payload: WordInterface[]) {
    state.currentDictionary = payload;
  }
};

export default dictionaryMutations;
