import firebase from "firebase/app";
require("firebase/database");

const dictionaryAPI = {
  getWords: async userID => {
    try {
      let data = await firebase
        .database()
        .ref(`/users/${userID}/dictionary`)
        .once("value");
      return data.val();
    } catch (error) {
      console.log(error);
    }
  },
  getCurrentWords: async (userID, indexWords) => {
    let data = await firebase
      .database()
      .ref(`/users/${userID}/dictionary/${indexWords}`)
      .once("value");
    return data.val();
  },
  updateWords: async (userID, words) => {
    await firebase
      .database()
      .ref(`/users/${userID}/dictionary`)
      .set(words);
  },
  saveTranscripton: async (userID, indexWords, wordsIndex, wordsData) => {
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
