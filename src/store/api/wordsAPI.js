import firebase from "@firebase/app";
require("firebase/database");

const wordsAPI = {
  getListWords: async id => {
    let list = await firebase.default
      .database()
      .ref(`users/${id}/words`)
      .once("value");
    return list;
  },
  getWords: async (userID, wordsID) => {
    let data = await firebase.default
      .database()
      .ref(`/users/${userID}/words/${wordsID}`)
      .once("value");
    return data;
  },
  setWords: async profileData => {
    await firebase.default
      .database()
      .ref("/users/" + profileData.id)
      .set({
        login: profileData.login,
        email: profileData.email,
        words: profileData.listWords,
        dictionary: profileData.dictionary
      });
  },
  getProfile: async userID => {
    let profile = await firebase.default
      .database()
      .ref("/users/" + userID)
      .once("value");
    return profile;
  },
  setEditWords: async (userID, wordsID, editWords, title) => {
    return await firebase.default
      .database()
      .ref(`/users/${userID}/words/${wordsID}`)
      .set({ words: editWords, title: title });
  },
  deleteWords: async (userID, words, email, login, dictionary) => {
    return await firebase.default
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
