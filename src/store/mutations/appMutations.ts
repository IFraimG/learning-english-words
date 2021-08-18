import { WordInterface } from "@/models/words"
import AppState from "@/models/store"

const appMutations = {
  setLogin(state: AppState, payload: boolean) {
    state.isLogin = payload
  },
  SET_MODAL_WORDS(state: AppState, payload: { title: string; list: WordInterface[] }) {
    state.startModalWords = { title: payload?.title, words: payload?.list }
  },
}

export default appMutations
