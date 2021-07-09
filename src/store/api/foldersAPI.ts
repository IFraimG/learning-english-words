import firebase from "firebase/app";
import "firebase/database"

const foldersAPI = {
  create: async (userID: string, title: string, id: string | null) => {
    let listRef = firebase.database().ref(`users/${userID}/folders`).push()
    await listRef.set({ title, id })

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
  }
};

export default foldersAPI;
