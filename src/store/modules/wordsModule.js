import wordsAction from "../actions/wordsActions"

const wordsModule = {
  state: () => ({
    currentWords: [],
    executeWords: [],
    wordData: null,
    stateWords: "start",
    isLoader: false,
    incorrectWords: []
  }),
  mutations: {
    GET_WORDS(state, payload) {
      state.currentWords = payload;
    },
    LOAD_WORDS(state, payload) {
      state.executeWords = payload
    },
    SET_LOADER(state, payload) {
      state.isLoader = payload
    },
    CHECK_STATE_WORDS(state, payload) {
      let query = payload.query
      let task = parseInt(query.task)
      switch (query.type) {
        case "start": state.stateWords = "start"; break;
        case "accordion": state.stateWords = "accordion"; break;
        case "englishV": state.stateWords = "englishV"; break;
        case "englishT": state.stateWords = "englishT"; break;
        case "finish": state.stateWords = "finish"; break;
        default: state.stateWords = "excpect";
      }
      state.wordData = state.executeWords[task - 1]
    },
    CHECK_CORRECT_WORD(state, payload) {
      state.incorrectWords = payload
    }
  },
  actions: wordsAction,
  getters: {
    currentWords: state => state.currentWords,
    executeWords: state => state.executeWords,
    stateWords: state => state.stateWords,
    wordData: state => state.wordData,
    isLoader: state => state.isLoader,
    incorrectWords: state => state.incorrectWords
  }
};

export default wordsModule