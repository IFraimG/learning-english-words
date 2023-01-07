import { UsersIT, UserType } from "@/models/users"

const usersMutations = {
  SET_LENGTH_USERS: (state: UsersIT, len: number) => {
    state.length = len
  },
  SET_POSITION: (state: UsersIT, payload: number) => {
    state.position = payload
  },
  UPDATE_LIST_PROFILES: (state: UsersIT, payload: Array<UserType>) => {
    state.users = [...state.users, ...payload]
  },
  CLEAR_LIST: (state: UsersIT) => {
    state.users = []
    state.length = 0
    state.position = 0
  },
  SET_FOUND_USER_BY_LOGIN(state: UsersIT, payload: UserType) {
    state.foundUser = payload
  }
}

export default usersMutations
