import router from "@/router/index"
import randomWords from "random-words"
import firebase from '@firebase/app';
require('firebase/database');

const wordsAction = {
  async createList({ commit }, payload) {
    try {
      let oldListWords = await firebase.default.database().ref("users/" + payload.profile.id + "/words").once("value")
      let newListWords = { title: payload.titleWords, words: payload.list, id: "grfedsfvdssds" }
      let listWords;
      if (oldListWords.val() == null) listWords = [newListWords];
      else listWords = [...oldListWords.val(), newListWords];
      await firebase.default.database().ref("/users/" + payload.profile.id).set({
        login: payload.profile.login, email: payload.profile.email, words: listWords
      })
      commit("GET_WORDS", listWords);
    } catch (err) {
      console.log(err);
    }
  },
  async getWords({ commit }, payload) {
    try {
      commit("SET_LOADER", true)
      let data = await firebase.default
        .database()
        .ref("/users/" + payload)
        .once("value");
      if (data.val()?.words != null) commit("GET_WORDS", data.val().words);
      commit("SET_LOADER", false)
    } catch (error) {
      commit("SET_LOADER", false)
      console.log(error);
    }
  },
  async loadWords({ commit }, payload) {
    try {
      commit("SET_LOADER", true);
      let userID = payload.params.userid;
      let wordsID = payload.params.wordsid;

      let data = await firebase.default
        .database()
        .ref(`/users/${userID}/words/${wordsID}`)
        .once("value");

      let words = data.val().words;
      if (words == null) router.go(-1);
      else {
        let reviewWords = [];
        for (let wordItem of words) {
          wordItem.other = randomWords(3);
          reviewWords.push(wordItem);
        }
        commit("LOAD_WORDS", reviewWords);
        commit("CHECK_STATE_WORDS", payload);
      }
      commit("SET_LOADER", false);
    } catch (error) {
      commit("SET_LOADER", false);
      console.log(error);
    }
  },
  async deleteWords({ commit }, payload) {
    try {
      commit("SET_LOADER", false);
      let wordsFull = payload.wordsFull.filter((wordList) => {
        return wordList.title != payload.title
      })
      await firebase.default.database().ref(`/users/${payload.userID}`).set({
        words: wordsFull, email: payload.email, login: payload.login
      });
    } catch (error) {
      console.log(error);
    }
  },
  async checkCorrectWord({ commit }, payload) {
    let isCorrect = await fetch(`http://speller.yandex.net/services/spellservice.json/checkText?text=${payload.wordData.english}`);
    let data = await isCorrect.json();
    if (data.length != 0) {
      let errWord = {
        incorrect: payload.wordData.english,
        correct: data[0].s[0],
        id: payload.wordData.id
      };
      commit("CHECK_CORRECT_WORD", errWord);
    } else commit("CHECK_CORRECT_WORD", null);
  },
  async getListWords({ commit }, payload) {
    try {
      commit("SET_LOADER", true);
      let data = await firebase.default
        .database()
        .ref(`/users/${payload.params.userid}/words/${payload.params.wordsid}`)
        .once("value");
      commit("GET_WORDS", data.val().words);
      commit("SET_LOADER", false);
    } catch (error) {
      commit("SET_LOADER", false);
    }
  },
  async sendEditWords({ commit }, payload) {
    try {
      await firebase.default.database().ref(`/users/${payload.userid}/words/${payload.wordsid}`).set({
        words: payload.editWords, title: payload.title, id: payload.id
      })
      let data = await firebase.default.database().ref(`/users/${payload.userid}`).once("value")
      commit("GET_WORDS", data.val().words)
    } catch (error) {
      console.log(error);
    }
  }
};

export default wordsAction;