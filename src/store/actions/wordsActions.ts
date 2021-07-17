import { DictionaryListInterface } from './../../models/dictionary';
import { WordInterface } from '@/models/words';
import WordsInterface from "@/models/words";
import router from "@/router/index";
import randomWords from "random-words";
import wordsAPI from "../api/wordsAPI";
import foldersAPI from '../api/foldersAPI';

const wordsAction = {
  async createList({ commit, rootState }: any, payload: {titleWords: string, list: WordsInterface[]}) {
    try {
      let profile = await wordsAPI.getProfile(rootState.auth.profile.id);
      let oldListWords = await wordsAPI.getListWords(rootState.auth.profile.id);
      let folders = await foldersAPI.receiveAll(rootState.auth.profile.id);
      let newListWords = { title: payload.titleWords, words: payload.list };
      let listWords = null;

      if (oldListWords == null) listWords = [newListWords];
      else listWords = [...oldListWords, newListWords];

      const saveData = {
        login: profile.login,
        email: profile.email,
        id: rootState.auth.profile.id,
        listWords: listWords,
        folders
      };
      await wordsAPI.setWords(saveData);

      commit("GET_WORDS", listWords);
    } catch (err) {
      console.log(err);
    }
  },
  async getWords({ commit }: any, payload: string) {
    try {
      commit("SET_LOADER", true);
      let data = await wordsAPI.getProfile(payload);
      if (data?.words != null) commit("GET_WORDS", data.words);
      commit("SET_LOADER", false);
    } catch (error) {
      commit("SET_LOADER", false);
      console.log(error);
    }
  },
  async loadWords({ commit }: any, payload: any) {
    try {
      commit("SET_LOADER", true);
      let userID = payload.params.userid;
      let wordsID = payload.params.wordsid;
      let data = await wordsAPI.getWords(userID, wordsID);

      let words = data.words;
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
  async deleteWords({ commit, rootState }: any, payload: any) {
    try {
      commit("SET_LOADER", false);
      let wordsFull = payload.wordsFull.filter((wordList: any) => wordList.title != payload.title);
      let folders = await foldersAPI.receiveAll(rootState.auth.profile.id)

      await wordsAPI.deleteWords(
        payload.userID,
        wordsFull,
        rootState.auth.profile.email,
        rootState.auth.profile.login,
        folders
      );
    } catch (error) {
      console.log(error);
    }
  },
  async checkCorrectWord({ commit }: any, payload: { wordData: WordInterface }) {
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
  async getListWords({ commit }: any, payload: {params: {userid: string, wordsid: string}}) {
    try {
      commit("SET_LOADER", true);
      let data = await wordsAPI.getWords(payload.params.userid, payload.params.wordsid);
      commit("GET_WORDS", data.words);
      commit("SET_LOADER", false);
    } catch (error) {
      commit("SET_LOADER", false);
    }
  },
  async sendEditWords({ commit }: any, payload: {userid: string, wordsid: string, editWords: WordInterface[], title: string}) {
    try {
      await wordsAPI.setEditWords(
        payload.userid,
        payload.wordsid,
        payload.editWords,
        payload.title
      );
      let data = await wordsAPI.getProfile(payload.userid);
      commit("GET_WORDS", data.words);
    } catch (error) {
      console.log(error);
    }
  },
  async checkTitles({ commit, rootState }: any, payload: string) {
    let isRepeat = false
    rootState.words.currentWords.forEach((item: DictionaryListInterface) => {
      if (item.title.trimStart().trimEnd().toLowerCase() == payload.trimStart().trimEnd().toLowerCase()) isRepeat = true
    })
    commit("CHECK_TITLE", isRepeat)
  }
};

export default wordsAction;
