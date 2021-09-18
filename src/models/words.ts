import { DictionaryListInterface } from "./dictionary"

export interface IncorrectWordInterface {
  correct: string
  id: string
  incorrect: string
}

export interface WordInterface {
  english: string
  russian: string
  readonly id: number
  transcription?: string
  currentTime?: string
  ruValues?: string[]
  enValues?: string[]
}

export default interface WordsInterface {
  incorrectWord: IncorrectWordInterface | null
  stateWords: string
  isLoader: boolean
  isRepeatingTitle: boolean
  wordData: WordInterface | null
  currentWords: DictionaryListInterface[]
  findWords: DictionaryListInterface[]
  executeWords: WordInterface[]
  wordsLength: number
}
