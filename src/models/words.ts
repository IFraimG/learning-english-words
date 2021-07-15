import { DictionaryListInterface } from "./dictionary";

export interface IncorrectWordInterface {
  correct: string
  id: string
  incorrect: string
}

export interface WordInterface {
  english: string
  russian: string
  id: number
  transcription?: string
  currentTime?: string
}

export default interface WordsInterface {
  incorrectWord: IncorrectWordInterface | null
  stateWords: string
  isLoader: boolean
  wordData: WordInterface | null
  currentWords: DictionaryListInterface[]
  findWords: DictionaryListInterface[]
  executeWords: WordInterface[]
}