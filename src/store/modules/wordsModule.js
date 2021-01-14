import router from "@/router/index"
import randomWords from "random-words"
// let Typo = require("typo-js")
import firebase from '@firebase/app';
require('firebase/database');

const wordsModule = {
  state: () => ({
    currentWords: [],
    executeWords: [],
    wordData: null,
    stateWords: "start",
    isLoader: false,
    incorrectWords: []
  }),
  mutations: {
    GET_WORDS(state, payload) {
      state.currentWords = payload;
    },
    LOAD_WORDS(state, payload) {
      state.executeWords = payload
    },
    SET_LOADER(state, payload) {
      state.isLoader = payload
    },
    CHECK_STATE_WORDS(state, payload) {
      let query = payload.query
      let task = parseInt(query.task)
      switch (query.type) {
        case "start": state.stateWords = "start"; break;
        case "russianV": state.stateWords = "russianV"; break;
        case "englishV": state.stateWords = "englishV"; break;
        case "englishT": state.stateWords = "englishT"; break;
        case "finish": state.stateWords = "finish"; break;
        default: state.stateWords = "excpect";
      }
      state.wordData = state.executeWords[task - 1]
    },
    CHECK_CORRECT_WORD(state, payload) {
      state.incorrectWords = payload
    }
  },
  actions: {
    async createList({ commit }, payload) {
      console.log(payload.list);
      try {
        let res = await firebase.default
          .database()
          .ref("users/" + payload.profile.id)
          .once("value");
        let oldListWords = res.val().words;
        let listWords;
        if (oldListWords == null) listWords = [payload.list];
        else listWords = [...oldListWords, payload.list];

        await firebase.default
          .database()
          .ref("users/" + payload.profile.id)
          .set({
            login: payload.profile.login,
            email: payload.profile.email,
            words: listWords,
          });
        commit("GET_WORDS", listWords);
      } catch (err) {
        console.log(err);
      }
    },
    async getWords({ commit }, payload) {
      try {
        let data = await firebase.default
          .database()
          .ref("/users/" + payload)
          .once("value");
        commit("GET_WORDS", data.val().words);
      } catch (error) {
        console.log(error);
      }
    },
    async loadWords({ commit }, payload) {
      try {
        commit("SET_LOADER", true)
        let userID = payload.params.userid
        let wordsID = payload.params.wordsid

        let data = await firebase.default.database().ref(`/users/${userID}/words/${wordsID}`).once("value")
        let words = data.val()
        if (words == null) router.go(-1)
        else {
          let reviewWords = []
          for (let wordItem of words) {
            wordItem.other = randomWords(3)
            reviewWords.push(wordItem)
          }
          commit("LOAD_WORDS", reviewWords)
          commit("CHECK_STATE_WORDS", payload)
        }
        commit("SET_LOADER", false)
      } catch (error) {
        commit("SET_LOADER", false)
        console.log(error);
      }
    },
    async deleteWords({ commit }, payload) {
      try {
        commit("SET_LOADER", false)
        console.log(payload);
        await firebase.default.database().ref(`/users/${payload.userID}/words/${payload.index}`).remove()
        let data = await firebase.default.database().ref(`/users/${payload.userID}`).once("value")
        commit("GET_WORDS", data.words.val());
      } catch (error) {
        console.log(error);
      }
    },
    async checkCorrectWord({ commit }, payload) {
      let isCorrect = await fetch(`http://speller.yandex.net/services/spellservice.json/checkText?text=${payload.word}`)
      let data = await isCorrect.json()
      let newArray = []
      console.log(payload.word);
      if (data.length != 0) {
        let errWord = {
          incorrect: payload.word,
          correct: data[0].s[0],
          id: payload.id
        }
        payload.errors.map(err => {
          if (err.correct != errWord.correct && err.id != errWord.id) newArray.push(err)
        })
        newArray.push(errWord)
        commit("CHECK_CORRECT_WORD", newArray)
      } else {
        payload.errors.map(err => {
          if (payload.word != err.correct) newArray.push(err)
        })
        console.log(newArray);
        commit("CHECK_CORRECT_WORD", newArray)
      }
    },
  },
  getters: {
    currentWords: state => state.currentWords,
    executeWords: state => state.executeWords,
    stateWords: state => state.stateWords,
    wordData: state => state.wordData,
    isLoader: state => state.isLoader,
    incorrectWords: state => state.incorrectWords
  }
};

export default wordsModule