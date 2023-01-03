import { UsersIT } from "@/models/users"
import usersActions from "../actions/usersActions"
import usersMutations from "../mutations/usersMutations"

const usersModule = {
  state(): UsersIT {
    return {
      users: [],
      length: 0,
      position: 0,
    }
  },
  mutations: usersMutations,
  actions: usersActions,
  getters: {
    getLength: (state: UsersIT) => state.length,
    position: (state: UsersIT) => state.position,
    differencePos: (state: UsersIT) => state.length - state.position,
    users: (state: UsersIT) => state.users,
  },
}

export default usersModule
