import { UserType } from './../../models/users';
import usersAPI from "../api/usersAPI"

const usersActions = {
  async getUsersList({ commit, dispatch, rootState }: any) {
    try {
      commit("SET_LOADER", true)
      const users = await usersAPI.getUsersList()
      let len = 0
      if (users != null) for (let i in users) len++
      commit("SET_LENGTH_USERS", len)
      if (len > 3) commit("SET_POSITION", 3)

      await dispatch("showMoreUsers")
      commit("SET_LOADER", false)
    } catch (error) {
      commit("SET_LOADER", false)
      console.log(error)
    }
  },
  async showMoreUsers({ commit, rootState }: any) {
    let pos = rootState.users.position

    const list = await usersAPI.getCurrentUsers(pos)
    let arrProfiles: UserType[] = []
    let index = 0

    console.log(list);

    for (let i in list) {
      if (index < 3) index++
      else break

      let lenWords = 0
      let lenFolders = 0
      let titleOfList = ""

      if (list[i]?.words != null) {
        lenWords = list[i].words.length
        titleOfList = list[i].words[list[i].words.length - 1].title
      }

      if (list[i]?.folders != null) for (let j in list[i].folders) lenFolders++

      arrProfiles.push({ id: i, login: list[i].login, words: lenWords, folders: lenFolders, title: titleOfList })
    }

    arrProfiles.forEach((item, index) => {
      if (item.id == rootState.auth.profile.id) arrProfiles.splice(index, 1)
    })

    commit("SET_POSITION", pos + 3)
    commit("UPDATE_LIST_PROFILES", arrProfiles)
  }
}

export default usersActions
