import { WordInterface } from "@/models/words"

export interface DictionaryState {
  dictionaryList: WordInterface[]
  currentDictionary: DictionaryListInterface | null
}

export interface CurrentDictionaryPayload {
  query: number
  id: string
}

export interface UpdateDictionaryIT {
  id: string
  words: Array<DictionaryListInterface>
}

export interface SaveTranscriptionIT {
  userID: string
  query: number
  wordIndex: number
  wordData: WordInterface
}

// words
export interface DictionaryListInterface {
  id: string
  title: string
  words: Array<WordInterface>
}
