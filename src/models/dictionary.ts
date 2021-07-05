import { WordInterface } from "./words";

export interface DictionaryState {
    dictionaryList: Array<any>
    currentDictionary: Array<any>
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

export interface DictionaryListInterface {
    id: string
    title: string
    words: Array<WordInterface>
}