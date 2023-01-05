import { DictionaryState, DictionaryListInterface } from "@/models/dictionary"

const dictionaryMutations = {
  SET_DICTIONARY(state: DictionaryState, payload: any[]) {
    state.dictionaryList = payload
    state.currentDictionary = payload[0]
  },
  SET_CURRENT_DICTIONARY(state: DictionaryState, payload: DictionaryListInterface) {
    state.currentDictionary = payload
  },
  FIND_DICTIONARY_TITLE(state: DictionaryState, payload: string) {
    let wordsData: any = null

    state.dictionaryList.map((item: any) => {
      if (
        item.title
          .trimLeft()
          .trimRight()
          .toLowerCase() == payload
      )
        wordsData = item
    })

    if (wordsData != null) state.currentDictionary = wordsData
  },
  SET_TRANSLATED_DICT_WORDS(state: DictionaryState, payload: { enWord: string, ruWord: string }) {
    state.translatedWords.enWord = payload.enWord
    state.translatedWords.ruWord = payload.ruWord
  }
}

export default dictionaryMutations
