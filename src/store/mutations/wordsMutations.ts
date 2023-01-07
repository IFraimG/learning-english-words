import { UserType } from './../../models/users';
import { IncorrectWordInterface } from "./../../models/words"
import WordsInterface, { WordInterface } from "@/models/words"
import { DictionaryListInterface } from "@/models/dictionary"

const wordsMutations = {
  GET_WORDS(state: WordsInterface, payload: DictionaryListInterface[]) {
    state.currentWords = payload
    let len = 0

    state.currentWords.map((wordsItem: DictionaryListInterface) => wordsItem.words.map(() => len++))
    state.wordsLength = len
  },
  LOAD_WORDS(state: WordsInterface, payload: WordInterface[]) {
    state.executeWords = payload
  },
  SET_LOADER(state: WordsInterface, payload: boolean) {
    state.isLoader = payload
  },
  CHECK_STATE_WORDS(state: WordsInterface, payload: { query: { task: string; type: string } }) {
    const query = payload.query
    const task = parseInt(query.task)
    switch (query.type) {
      case "start":
        state.stateWords = "start"
        break
      case "accordion":
        state.stateWords = "accordion"
        break
      case "englishV":
        state.stateWords = "englishV"
        break
      case "englishT":
        state.stateWords = "englishT"
        break
      case "sentences":
        state.stateWords = "sentences"
        break
      case "finish":
        state.stateWords = "finish"
        break
      default:
        state.stateWords = "excpect"
    }
    state.wordData = state.executeWords[task - 1]
  },
  CHECK_CORRECT_WORD(state: WordsInterface, payload: IncorrectWordInterface) {
    state.incorrectWord = payload
  },
  FIND_TITLE(state: WordsInterface, payload: string) {
    const title = payload.trimStart().trimEnd().toLowerCase()
    const wordsList: any = []

    state.currentWords.map((item: DictionaryListInterface) => {
      let isTrue = true
      const originalTitle = item.title.trimStart().trimEnd().toLowerCase()

      for (let i = 0; i < title.length; i++) {
        if (originalTitle[i] !== title[i]) {
          isTrue = false
          break
        }
      }

      if (isTrue) wordsList.push(item)
    })

    if (wordsList.length > 0) state.findWords = wordsList
    else state.findWords = []
  },
  CHECK_TITLE(state: WordsInterface, payload: boolean) {
    state.isRepeatingTitle = payload
  },
  SET_IMAGE(state: WordsInterface, payload: { id: string, img: any }) {
    const index = state.currentWords.findIndex((wordItem: any) => wordItem.id == payload.id)
    if (index != -1 && payload.img?.server != null && payload.img?.id != null && payload.img?.secret != null) {
      state.currentWords[index].img = `https://live.staticflickr.com/${payload.img.server}/${payload.img.id}_${payload.img.secret}.jpg`
    }
  },
  SET_TRANSLATION_WORD(state: WordsInterface, payload: { en: string, ru: string }) {
    state.translatedWords.en = payload.en
    state.translatedWords.ru = payload.ru
  },
  SET_IMAGE_WORDS_TO_LIST(state: WordsInterface, payload: { en: string, ru: string }) {
    state.fieldWords.ru = payload.ru
    state.fieldWords.en = payload.en
  }
}

export default wordsMutations
