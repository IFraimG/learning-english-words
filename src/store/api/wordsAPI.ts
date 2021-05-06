import { WordInterface } from "@/models/words";
import firebase from "firebase/app";
import "firebase/database" 

const wordsAPI = {
  getListWords: async (id: string) => {
    let list = await firebase
      .database()
      .ref(`users/${id}/words`)
      .once("value");
    return list;
  },
  getWords: async (userID: string, wordsID: string) => {
    let data = await firebase
      .database()
      .ref(`/users/${userID}/words/${wordsID}`)
      .once("value");
    return data;
  },
  setWords: async (profileData: any) => {
    await firebase
      .database()
      .ref("/users/" + profileData.id)
      .set({
        login: profileData.login,
        email: profileData.email,
        words: profileData.listWords,
        dictionary: profileData.dictionary
      });
  },
  getProfile: async (userID: string) => {
    let profile = await firebase
      .database()
      .ref("/users/" + userID)
      .once("value");
    return profile;
  },
  setEditWords: async (userID: string, wordsID: string, editWords: Array<WordInterface>, title: string) => {
    return await firebase
      .database()
      .ref(`/users/${userID}/words/${wordsID}`)
      .set({ words: editWords, title: title });
  },
  deleteWords: async (userID: string, words: Array<WordInterface>, email: string, login: string, dictionary: Array<any>) => {
    return await firebase
      .database()
      .ref(`/users/${userID}`)
      .set({
        words: words,
        email: email,
        login: login,
        dictionary: dictionary
      });
  }
};

export default wordsAPI;
