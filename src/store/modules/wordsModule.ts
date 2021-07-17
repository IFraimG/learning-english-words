import WordsInterface from "./../../models/words";
import wordsAction from "../actions/wordsActions";
import wordsMutations from "../mutations/wordsMutations";

const wordsModule = {
  state: () => (<WordsInterface>{
      currentWords: [],
      findWords: [],
      executeWords: [],
      wordData: null,
      stateWords: "start",
      isLoader: false,
      incorrectWord: null,
      isRepeatingTitle: false
    }),
  mutations: wordsMutations,
  actions: wordsAction,
  getters: {
    currentWords: (state: any) => state.currentWords,
    executeWords: (state: any) => state.executeWords,
    stateWords: (state: any) => state.stateWords,
    findWords: (state: any) => state.findWords,
    wordData: (state: any) => state.wordData,
    isLoader: (state: any): boolean => state.isLoader,
    incorrectWord: (state: any) => state.incorrectWord,
    isRepeatingTitle: (state: any) => state.isRepeatingTitle,
  },
};

export default wordsModule;
