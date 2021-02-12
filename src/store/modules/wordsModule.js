import wordsAction from "../actions/wordsActions"
import wordsMutations from "../mutations/wordsMutations";

const wordsModule = {
  state: () => ({
    currentWords: [],
    findWords: [],
    executeWords: [],
    wordData: null,
    stateWords: "start",
    isLoader: false,
    incorrectWord: null
  }),
  mutations: wordsMutations,
  actions: wordsAction,
  getters: {
    currentWords: state => state.currentWords,
    executeWords: state => state.executeWords,
    stateWords: state => state.stateWords,
    findWords: state => state.findWords,
    wordData: state => state.wordData,
    isLoader: state => state.isLoader,
    incorrectWord: state => state.incorrectWord
  }
};

export default wordsModule