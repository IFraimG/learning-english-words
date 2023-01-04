import WordsInterface from "./../../models/words"
import wordsAction from "../actions/wordsActions"
import wordsMutations from "../mutations/wordsMutations"

const wordsModule = {
  state(): WordsInterface {
    return {
      currentWords: [],
      findWords: [],
      executeWords: [],
      wordData: null,
      stateWords: "start",
      isLoader: false,
      incorrectWord: null,
      isRepeatingTitle: false,
      wordsLength: 0,
      translatedWords: { en: "", ru: "" }
    }
  },
  mutations: wordsMutations,
  actions: wordsAction,
  getters: {
    currentWords: (state: WordsInterface) => state.currentWords,
    executeWords: (state: WordsInterface) => state.executeWords,
    stateWords: (state: WordsInterface) => state.stateWords,
    findWords: (state: WordsInterface) => state.findWords,
    wordData: (state: WordsInterface) => state.wordData,
    isLoader: (state: WordsInterface): boolean => state.isLoader,
    incorrectWord: (state: WordsInterface) => state.incorrectWord,
    isRepeatingTitle: (state: WordsInterface) => state.isRepeatingTitle,
    wordsLength: (state: WordsInterface) => state.wordsLength,
    translatedWords: (state: WordsInterface) => state.translatedWords,
    reverseWords: (state: WordsInterface) => {
      const newArray: Array<any> = []
      let currentWordsCopy: any = state.currentWords
      if (state.findWords.length > 0) currentWordsCopy = state.findWords

      for (let i = currentWordsCopy.length - 1; i >= 0; i--) {
        newArray.push(currentWordsCopy[i])
      }

      newArray.unshift({})
      return newArray
    }
  },
}

export default wordsModule
