import WordsInterface from "./../../models/words";
import wordsAction from "../actions/wordsActions";
import wordsMutations from "../mutations/wordsMutations";

const wordsModule = {
  state: () => ({
    currentWords: [],
    findWords: [],
    executeWords: [],
    wordData: null,
    stateWords: "start",
    isLoader: false,
    incorrectWord: null,
    isRepeatingTitle: false,
    wordsLength: 0
  } as WordsInterface),
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
    wordsLength: (state: WordsInterface) => state.wordsLength
  },
};

export default wordsModule;
