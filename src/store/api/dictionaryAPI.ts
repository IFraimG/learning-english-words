import { DictionaryListInterface } from "@/models/dictionary";
import firebase from "firebase/app";
import "firebase/database"

const dictionaryAPI = {
  getWords: async (userID: string): Promise<DictionaryListInterface | undefined> => {
    try {
      let data = await firebase
        .database()
        .ref(`/users/${userID}/dictionary`)
        .once("value");
        console.log(data.val());
        
      return data.val();
    } catch (error) {
      console.log(error);
    }
  },
  getCurrentWords: async (userID: string, indexWords: number) => {
    let data = await firebase
      .database()
      .ref(`/users/${userID}/dictionary/${indexWords}`)
      .once("value");
    return data.val();
  },
  updateWords: async (userID: string, words: Array<any>) => {
    await firebase
      .database()
      .ref(`/users/${userID}/dictionary`)
      .set(words);
  },
  saveTranscripton: async (userID: string, indexWords: number, wordsIndex: number, wordsData: any) => {
    try {
      await firebase
        .database()
        .ref(`/users/${userID}/dictionary/${indexWords}/words/${wordsIndex}`)
        .set(wordsData);
    } catch (error) {
      console.log(error);
    }
  }
};

export default dictionaryAPI;
