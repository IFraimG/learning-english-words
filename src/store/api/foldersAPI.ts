import { FolderShortItfc, KeyFolderItfc } from './../../models/folders';
import firebase from "firebase/app";
import "firebase/database"

const foldersAPI = {
  create: async (userID: string, title: string, id: string | null) => {
    let listRef = firebase.database().ref(`users/${userID}/folders`).push()
    await listRef.set({ title, id, listModules: [] })

    return listRef.key
  },
  receiveAll: async (userID: string) => {
    let res = await firebase
      .database()
      .ref(`users/${userID}/folders`)
      .once("value")

    if (!res.exists()) return null
    return res.val()
  },
  async receiveItem(userID: string, folderID: string) {
    let res = await firebase
      .database()
      .ref(`users/${userID}/folders/${folderID}`)
      .once("value")

    if (!res.exists()) return null
    return res.val()
  },
  async addWordsToFolder(userID: string, folder: FolderShortItfc, titleWords: string) {
    let item = await this.receiveItem(userID, folder.key)
    await firebase
      .database()
      .ref(`users/${userID}/folders/${folder.key}`)
      .set({
        title: folder.title,
        id: folder.id,
        listModules: item.listModules != null ? [...item.listModules, titleWords] : [titleWords]
      })
  },
  async deleteFolder(userID: string, key: string) {
    return await firebase.database().ref(`users/${userID}/folders/${key}`).remove()
  },
  async deleteWordsFromFolder(userID: string, folder: KeyFolderItfc) {
    return await firebase.database().ref(`users/${userID}/folders/${folder.key}`).set({
      title: folder.title, id: folder.id, listModules: folder.listModules
    })
  }
};

export default foldersAPI;
