import firebase from "@firebase/app";
require("firebase/database");

const wordsAPI = {
  getListWords: async (id) => {
    let list = await firebase.default
      .database()
      .ref(`users/${id}/words`)
      .once("value");
    return list
  },
  getWords: async (userID, wordsID) => {
    let data = await firebase.default
      .database()
      .ref(`/users/${userID}/words/${wordsID}`)
      .once("value");
    return data
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
  getProfile: async (id) => {
    let profile = await firebase.default
      .database()
      .ref("/users/" + id)
      .once("value");
    return profile
  }
}

export default wordsAPI