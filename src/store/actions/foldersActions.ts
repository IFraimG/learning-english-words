import { FolderItfc, FolderShortItfc } from './../../models/folders';
import generateID from "@/utils/generateID"
import foldersAPI from "../api/foldersAPI"

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

      let folderItem: FolderItfc = await foldersAPI.receiveItem(rootState.auth.profile.id, payload)
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
      console.log(payload);
      await foldersAPI.addWordsToFolder(rootState.auth.profile.id, payload.section, payload.title)
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default foldersAction