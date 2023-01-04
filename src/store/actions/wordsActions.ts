import { DictionaryListInterface } from "./../../models/dictionary"
import { WordInterface } from "@/models/words"
import WordsInterface from "@/models/words"
import router from "@/router/index"
import randomWords from "random-words"
import wordsAPI from "../api/wordsAPI"
import foldersAPI from "../api/foldersAPI"
import usersAPI from "../api/usersAPI"

const wordsAction = {
  async createList({ commit, rootState }: any, payload: { titleWords: string; list: WordsInterface[] }) {
    try {
      const profile = await usersAPI.getProfile(rootState.auth.profile.id)
      const oldListWords = await wordsAPI.getListWords(rootState.auth.profile.id)
      const folders = await foldersAPI.receiveAll(rootState.auth.profile.id)
      let listWords = null
      const startList = rootState.app.startModalWords
      const newListWords = { title: payload.titleWords, words: payload.list }

      if (startList?.title != null && startList?.words != null) {
        newListWords.title = startList.title
        newListWords.words = [...startList.words, ...newListWords.words]
      }

      if (oldListWords == null) listWords = [newListWords]
      else {
        if (startList?.title != null && startList?.words != null) {
          const index = oldListWords.findIndex((item: any) => item.title == startList.title)
          if (index != -1) oldListWords[index].words = [...newListWords.words]
          listWords = [...oldListWords]
        } else listWords = [...oldListWords, newListWords]
      }

      const saveData = {
        login: profile.login,
        email: profile.email,
        id: rootState.auth.profile.id,
        listWords: listWords,
        folders,
      }

      await wordsAPI.setWords(saveData)

      commit("GET_WORDS", listWords)
      commit("SET_MODAL_WORDS", { isModal: false, list: null, title: null })
    } catch (err) {
      console.log(err)
    }
  },
  async getWords({ commit, rootState }: any, userID: string) {
    try {
      commit("SET_LOADER", true)
      const data = await usersAPI.getProfile(userID)
      if (data == null) router.push("/")
      else if (data?.words != null) commit("GET_WORDS", data.words)
      else commit("GET_WORDS", [])
      commit("SET_LOADER", false)
    } catch (error) {
      commit("SET_LOADER", false)
      console.log(error)
    }
  },
  async loadWords({ commit }: any, payload: any) {
    try {
      commit("SET_LOADER", true)
      const userID = payload.params.userid
      const wordsID = payload.params.wordsid
      const data = await wordsAPI.getWords(userID, wordsID)

      if (data.words == null) router.go(-1)
      else {
        const reviewWords = []
        for (const wordItem of data.words) {
          wordItem.other = randomWords(3)
          reviewWords.push(wordItem)
        }
        commit("LOAD_WORDS", reviewWords)
        commit("CHECK_STATE_WORDS", payload)
      }

      commit("GET_WORDS", data.words)
      commit("SET_LOADER", false)
    } catch (error) {
      commit("SET_LOADER", false)
      console.log(error)
    }
  },
  async deleteWords({ commit, rootState }: any, payload: any) {
    try {
      const wordsFull = payload.wordsFull.filter((wordList: any) => wordList.title != payload.title)
      const folders = await foldersAPI.receiveAll(rootState.auth.profile.id)

      await wordsAPI.deleteWords(rootState.auth.profile.id, wordsFull, rootState.auth.profile.email, rootState.auth.profile.login, folders)
      commit("GET_WORDS", wordsFull)
    } catch (error) {
      console.log(error)
    }
  },
  async checkCorrectWord({ commit }: any, payload: { wordData: WordInterface }) {
    try {
      const isCorrect = await fetch(`https://speller.yandex.net/services/spellservice.json/checkText?text=${payload.wordData.english}`)
      const data = await isCorrect.json()
      if (data.length != 0) {
        const errWord = {
          incorrect: payload.wordData.english,
          correct: data[0].s[0],
          id: payload.wordData.id,
        }
        commit("CHECK_CORRECT_WORD", errWord)
      } else commit("CHECK_CORRECT_WORD", null)
    } catch (error) {
      console.log(error)
      commit("CHECK_CORRECT_WORD", null)
    }
  },
  async getListWords({ commit }: any, payload: { params: { userid: string; wordsid: string } }) {
    try {
      commit("SET_LOADER", true)
      const data = await wordsAPI.getWords(payload.params.userid, payload.params.wordsid)
      commit("GET_WORDS", data.words)
      commit("SET_LOADER", false)
    } catch (error) {
      commit("SET_LOADER", false)
    }
  },
  async sendEditWords({ commit }: any, payload: { userid: string; wordsid: string; editWords: WordInterface[]; title: string }) {
    try {
      await wordsAPI.setEditWords(payload.userid, payload.wordsid, payload.editWords, payload.title)
      const data = await usersAPI.getProfile(payload.userid)
      commit("GET_WORDS", data.words)
    } catch (error) {
      console.log(error)
    }
  },
  async checkTitles({ commit, rootState }: any, payload: string) {
    let isRepeat = false
    rootState.words.currentWords.forEach((item: DictionaryListInterface) => {
      if (item.title.trimStart().trimEnd().toLowerCase() == payload.trimStart().trimEnd().toLowerCase()) isRepeat = true
    })
    commit("CHECK_TITLE", isRepeat)
  },
  loadImagesForWords({ commit, rootState }: any) {
    if (rootState.words?.currentWords != null && rootState.words.currentWords.length > 0) {
      rootState.words.currentWords.map(async (wordItem: any) => {
        const img = await wordsAPI.searchImages(wordItem.english.toLowerCase())
        commit("SET_IMAGE", { id: wordItem.id, img })
      })
    }
  },
  async loadWordsFromJSON({ commit, rootState }: any, payload: any[]) {
    const profile = await usersAPI.getProfile(rootState.auth.profile.id)
    const folders = await foldersAPI.receiveAll(rootState.auth.profile.id)
    const oldListWords = await wordsAPI.getListWords(rootState.auth.profile.id)

    const newList = oldListWords?.length != null ? [...oldListWords] : [...payload]
    if (oldListWords?.length != null) {
      payload.forEach((item: any) => {
        oldListWords.forEach((item2: any) => {
          if (item2.title != item.title) newList.push(item)
        })
      })
    }

    const saveData = {
      login: profile.login,
      email: profile.email,
      id: rootState.auth.profile.id,
      listWords: newList,
      folders
    }

    await wordsAPI.setWords(saveData)
    commit("GET_WORDS", payload)
  },
  async translateWord({ commit }: any, payload: string) {
    const enWord = await wordsAPI.translateWord("en", payload)
    console.log(enWord)
    if (enWord != null) commit("SET_TRANSLATION_WORD", { ru: payload, en: enWord })
  }
}

export default wordsAction
