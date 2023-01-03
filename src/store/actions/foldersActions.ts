import { FolderItfc, FolderShortItfc } from "./../../models/folders"
import generateID from "@/utils/generateID"
import foldersAPI from "../api/foldersAPI"
import wordsAPI from "../api/wordsAPI"

const foldersAction = {
  async createFolder({ commit, rootState }: any, payload: string) {
    try {
      const folders = await foldersAPI.receiveAll(rootState.auth.profile.id)
      const id = generateID(folders)

      const key = await foldersAPI.create(rootState.auth.profile.id, payload, id)
      commit("ROUTE_FOLDER", key)
    } catch (err) {
      console.log(err)
    }
  },
  async getFolder({ commit, rootState }: any, payload: string) {
    try {
      commit("SET_LOADER_ITEM", true)
      const list = []

      const folderItem: FolderItfc = await foldersAPI.receiveItem(rootState.auth.profile.id, payload)
      if (folderItem?.listModules != null) {
        const words = await wordsAPI.getListWords(rootState.auth.profile.id)
        const len = folderItem.listModules.length
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < words.length; j++) {
            if (folderItem.listModules[i] == words[j].title) list.push(words[j])
          }
        }
      }

      folderItem.listModules = list
      commit("SET_FOLDER", folderItem)

      commit("SET_LOADER_ITEM", false)
    } catch (error) {
      console.log(error)
      commit("SET_LOADER_ITEM", false)
    }
  },
  async getFoldersList({ commit, rootState }: any) {
    try {
      commit("SET_LOADER_ITEM", true)

      const folders = await foldersAPI.receiveAll(rootState.auth.profile.id)
      commit("SET_FOLDERS", folders)

      commit("SET_LOADER_ITEM", false)
    } catch (error) {
      console.log(error)
      commit("SET_LOADER_ITEM", false)
    }
  },
  async addWordsToSection({ rootState }: any, payload: { section: FolderShortItfc; title: string }) {
    try {
      await foldersAPI.addWordsToFolder(rootState.auth.profile.id, payload.section, payload.title)
    } catch (error) {
      console.log(error)
    }
  },
  async deleteFolder({ rootState }: any, payload: { key: string }) {
    try {
      await foldersAPI.deleteFolder(rootState.auth.profile.id, payload.key)
    } catch (error) {
      console.log(error.message)
    }
  },
  async deleteWordsFromFolder({ rootState }: any, payload: { folder: FolderItfc | any; title: string; key: string }) {
    try {
      const folderList: any = []

      payload.folder.listModules.filter((item: FolderShortItfc) => {
        if (item.title != payload.title) folderList.push(item.title)
      })

      const folder = { ...payload.folder, listModules: folderList, key: payload.key }

      await foldersAPI.deleteWordsFromFolder(rootState.auth.profile.id, folder)
      window.location.reload()
    } catch (error: any) {
      console.log(error.message)
    }
  },
}

export default foldersAction
