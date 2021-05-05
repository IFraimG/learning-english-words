import { WordInterface } from "./words";

export interface DictionaryState {
    dictionaryList: Array<any>
    currentDictionary: Array<any>
}

export interface DictionaryListInterface {
    id: string
    title: string
    words: Array<WordInterface>
}