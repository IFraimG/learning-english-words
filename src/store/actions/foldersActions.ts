import { FolderItfc, FolderShortItfc } from './../../models/folders';
import generateID from "@/utils/generateID"
import foldersAPI from "../api/foldersAPI"
import wordsAPI from '../api/wordsAPI';

const foldersAction = {
  async createFolder({ commit, rootState }: any, payload: string) {
    try {
      let folders = await foldersAPI.receiveAll(rootState.auth.profile.id)
      let id = generateID(folders)

      let key = await foldersAPI.create(rootState.auth.profile.id, payload, id)
      commit("ROUTE_FOLDER", key)
    } catch (err) {
      console.log(err);
    }
  },
  async getFolder({ commit, rootState }: any, payload: string) {
    try {
      commit("SET_LOADER_ITEM", true)
      let list = []

      let folderItem: FolderItfc = await foldersAPI.receiveItem(rootState.auth.profile.id, payload)
      if (folderItem?.listModules != null) {
        let words = await wordsAPI.getListWords(rootState.auth.profile.id)
        let len =  folderItem.listModules.length
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
      console.log(error);
    }
  },
  async getFoldersList({ commit, rootState}: any) {
    commit("SET_LOADER_ITEM", true)

    let folders = await foldersAPI.receiveAll(rootState.auth.profile.id)
    commit("SET_FOLDERS", folders)

    commit("SET_LOADER_ITEM", false)
  },
  async addWordsToSection({ commit, rootState }: any, payload: {section: FolderShortItfc, title: string}) {
    try {
      await foldersAPI.addWordsToFolder(rootState.auth.profile.id, payload.section, payload.title)
    } catch (error) {
      console.log(error);
    }
  }
}

export default foldersAction