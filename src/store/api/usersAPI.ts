import firebase from "firebase/app"
import "firebase/database"

const usersAPI = {
  getUsersList: async (): Promise<any | undefined> => {
    try {
      const data = await firebase
        .database()
        .ref(`/users`)
        .once("value")
      return data.val()
    } catch (error) {
      console.log(error)
    }
  },
  getCurrentUsers: async (start: number): Promise<any> => {
    try {
      const data = await firebase.database().ref("/users").limitToLast(start).once("value")
      return data.val()
    } catch (error) {
      console.log(error);
    }
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
  getProfileByLogin: async (login: string) => {
    try {
      const res = await firebase.database().ref().child('users').orderByChild('login').equalTo(login).once("value")
      return res.val()
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default usersAPI
