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
    let isCorrect = await fetch(
      `http://speller.yandex.net/services/spellservice.json/checkText?text=${payload.word}`
    );
    let data = await isCorrect.json();
    let newArray = [];
    console.log(payload.word);
    if (data.length != 0) {
      let errWord = {
        incorrect: payload.word,
        correct: data[0].s[0],
        id: payload.id,
      };
      payload.errors.map((err) => {
        if (err.correct != errWord.correct && err.id != errWord.id)
          newArray.push(err);
      });
      newArray.push(errWord);
      commit("CHECK_CORRECT_WORD", newArray);
    } else {
      payload.errors.map((err) => {
        if (payload.word != err.correct) newArray.push(err);
      });
      console.log(newArray);
      commit("CHECK_CORRECT_WORD", newArray);
    }
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
};

export default wordsAction;