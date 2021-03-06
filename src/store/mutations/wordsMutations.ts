import { IncorrectWordInterface } from './../../models/words';
import WordsInterface, { WordInterface } from "@/models/words";
import { DictionaryListInterface } from '@/models/dictionary';

const wordsMutations = {
  GET_WORDS(state: WordsInterface, payload: DictionaryListInterface[]) {
    state.currentWords = payload;
  },
  LOAD_WORDS(state: WordsInterface, payload: WordInterface[]) {
    state.executeWords = payload;
  },
  SET_LOADER(state: WordsInterface, payload: boolean) {
    state.isLoader = payload;
  },
  CHECK_STATE_WORDS(state: WordsInterface, payload: { query: { task: string, type: string }}) {
    let query = payload.query;
    let task = parseInt(query.task);
    switch (query.type) {
      case "start":
        state.stateWords = "start";
        break;
      case "accordion":
        state.stateWords = "accordion";
        break;
      case "englishV":
        state.stateWords = "englishV";
        break;
      case "englishT":
        state.stateWords = "englishT";
        break;
      case "finish":
        state.stateWords = "finish";
        break;
      default:
        state.stateWords = "excpect";
    }
    state.wordData = state.executeWords[task - 1];
  },
  CHECK_CORRECT_WORD(state: WordsInterface, payload: IncorrectWordInterface) {
    state.incorrectWord = payload;
  },
  FIND_TITLE(state: WordsInterface, payload: string) {
    let title = payload;
    let wordsList: any[] = [];
    state.currentWords.map(item => {
      if (item.title.trimLeft().trimRight().toLowerCase() == title) wordsList.push(item);
    });
    if (wordsList.length > 0) state.findWords = wordsList;
    else state.findWords = [];
  }
};

export default wordsMutations;
