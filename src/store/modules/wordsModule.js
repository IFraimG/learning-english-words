import router from "@/router/index"
import randomWords from "random-words"
import firebase from '@firebase/app';
require('firebase/auth');
require('firebase/database');

const wordsModule = {
  state: () => ({
    currentWords: [],
    executeWords: [],
    wordData: {},
    stateWords: "start"
  }),
  mutations: {
    GET_WORDS(state, payload) {
      state.currentWords = payload;
    },
    LOAD_WORDS(state, payload) {
      state.executeWords = payload
    },
    CHECK_STATE_WORDS(state, payload) {
      switch (payload.query.type) {
        case "start": state.stateWords = "start"; break;
        case "russianV": state.stateWords = "russianV"; break;
        case "englishV": state.stateWords = "englishV"; break;
        case "englishT": state.stateWords = "englishT"; break;
        case "finish": state.stateWords = "finish"; break;
        default: state.stateWords = "excpect";
      }
      if (payload.query.task != undefined) state.wordData = state.executeWords[parseInt(payload.query.task) + 1]
    }
  },
  actions: {
    async createList({ commit }, payload) {
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
        commit("GET_WORDS", payload.list);
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
          console.log(reviewWords);
          commit("LOAD_WORDS", reviewWords)
          commit("CHECK_STATE_WORDS", payload)
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    currentWords: state => state.currentWords,
    stateWords: state => state.stateWords,
    wordData: state => state.wordData
  }
};

export default wordsModule