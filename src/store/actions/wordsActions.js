import router from "@/router/index";
import randomWords from "random-words";
import wordsAPI from "../api/wordsAPI";

const wordsAction = {
  async createList({ commit }, payload) {
    try {
      let profile = await wordsAPI.getProfile(payload.profile.id)
      let oldListWords = await wordsAPI.getListWords(payload.profile.id)
      let newListWords = { title: payload.titleWords, words: payload.list };
      let listWords = null;

      if (oldListWords.val() == null) listWords = [newListWords];
      else listWords = [...oldListWords.val(), newListWords];

      const saveData = {
        login: profile.val().login,
        email: profile.val().email,
        id: payload.profile.id,
        listWords: listWords,
        dictionary: [...profile.val()?.dictionary, { title: payload.titleWords, words: payload.list }]
      }
      await wordsAPI.setWords(saveData)

      commit("GET_WORDS", listWords);
    } catch (err) {
      console.log(err);
    }
  },
  async getWords({ commit }, payload) {
    try {
      commit("SET_LOADER", true);
      let data = await wordsAPI.getProfile(payload)
      if (data.val()?.words != null) commit("GET_WORDS", data.val().words);
      commit("SET_LOADER", false);
    } catch (error) {
      commit("SET_LOADER", false);
      console.log(error);
    }
  },
  async loadWords({ commit }, payload) {
    try {
      commit("SET_LOADER", true);
      let userID = payload.params.userid;
      let wordsID = payload.params.wordsid;
      let data = await wordsAPI.getWords(userID, wordsID)

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
      let profile = await wordsAPI.getProfile(payload.userID)
      let wordsFull = payload.wordsFull.filter(wordList => {
        return wordList.title != payload.title;
      });
      let dictionaryFull = profile.val().dictionary.filter(dictionaryList => dictionaryList.title != payload.title);
      await wordsAPI.deleteWords(payload.userID, wordsFull, payload.email, payload.login, dictionaryFull)
    } catch (error) {
      console.log(error);
    }
  },
  async checkCorrectWord({ commit }, payload) {
    try {
      let isCorrect = await fetch(
        `https://speller.yandex.net/services/spellservice.json/checkText?text=${payload.wordData.english}`
      );
      let data = await isCorrect.json();
      if (data.length != 0) {
        let errWord = {
          incorrect: payload.wordData.english,
          correct: data[0].s[0],
          id: payload.wordData.id
        };
        commit("CHECK_CORRECT_WORD", errWord);
      } else commit("CHECK_CORRECT_WORD", null);
    } catch (error) {
      console.log(error);
      commit("CHECK_CORRECT_WORD", null);
    }
  },
  async getListWords({ commit }, payload) {
    try {
      commit("SET_LOADER", true);
      let data = await wordsAPI.getWords(payload.params.userid, payload.params.wordsid)
      commit("GET_WORDS", data.val().words);
      commit("SET_LOADER", false);
    } catch (error) {
      commit("SET_LOADER", false);
    }
  },
  async sendEditWords({ commit }, payload) {
    try {
      await wordsAPI.setEditWords(payload.userid, payload.wordsid, payload.editWords, payload.title)
      let data = await wordsAPI.getProfile(payload.userid)
      commit("GET_WORDS", data.val().words);
    } catch (error) {
      console.log(error);
    }
  }
};

export default wordsAction;
