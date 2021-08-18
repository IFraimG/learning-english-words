import { DictionaryListInterface } from "@/models/dictionary"
import { WordInterface } from "@/models/words"
import firebase from "firebase/app"
import "firebase/database"

const dictionaryAPI = {
  getWords: async (userID: string): Promise<DictionaryListInterface | undefined> => {
    try {
      const data = await firebase
        .database()
        .ref(`/users/${userID}/words`)
        .once("value")
      return data.val()
    } catch (error) {
      console.log(error)
    }
  },
  getCurrentWords: async (userID: string, indexWords: number) => {
    const data = await firebase
      .database()
      .ref(`/users/${userID}/words/${indexWords}`)
      .once("value")
    return data.val()
  },
  updateWords: async (userID: string, words: Array<DictionaryListInterface>) => {
    await firebase
      .database()
      .ref(`/users/${userID}/words`)
      .set(words)
  },
  saveTranscripton: async (userID: string, indexWord: number, wordIndex: number, wordsData: WordInterface) => {
    try {
      await firebase
        .database()
        .ref(`/users/${userID}/words/${indexWord}/words/${wordIndex}`)
        .set(wordsData)
    } catch (error) {
      console.log(error)
    }
  },
}

export default dictionaryAPI
