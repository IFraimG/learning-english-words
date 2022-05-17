import { FolderItfc } from "@/models/folders"
import { WordInterface } from "@/models/words"
import axios from "axios"
import firebase from "firebase/app"
import "firebase/database"

const wordsAPI = {
  getListWords: async (id: string) => {
    const list = await firebase
      .database()
      .ref()
      .child(`users/${id}/words`)
      .get()
    if (!list.exists()) return null
    return list.val()
  },
  getWords: async (userID: string, wordsID: string) => {
    const data = await firebase
      .database()
      .ref(`/users/${userID}/words/${wordsID}`)
      .once("value")
    return data.val()
  },
  setWords: async (profileData: any) => {
    await firebase
      .database()
      .ref("/users/" + profileData.id)
      .set({
        login: profileData.login,
        email: profileData.email,
        words: profileData.listWords,
        folders: profileData.folders,
      })
  },
  getProfile: async (userID: string) => {
    const profile = await firebase
      .database()
      .ref()
      .child("users")
      .child(userID)
      .get()
    return profile.val()
  },
  setEditWords: async (userID: string, wordsID: string, editWords: Array<WordInterface>, title: string) => {
    return await firebase
      .database()
      .ref(`/users/${userID}/words/${wordsID}`)
      .set({ words: editWords, title: title })
  },
  deleteWords: async (userID: string, words: Array<WordInterface>, email: string, login: string, folders: FolderItfc[]) => {
    return await firebase
      .database()
      .ref(`/users/${userID}`)
      .set({ words: words, email: email, login: login, folders })
  },
  searchImages: async (word: string) => {
    try {
      const res = await axios.get("https://api.flickr.com/services/rest", { params: {
          method: "flickr.photos.search",
          api_key: process.env.VUE_APP_FLICKR_KEY,
          tags: word,
          page: 1,
          text: word,
          format: "json",
          nojsoncallback: 1,
          per_page: 1
        }
      })

      return res.data.photos.photo[0]
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export default wordsAPI
