import { WordInterface } from '@/models/words';
import AppState from '@/models/store';

const appMutations = {
  setLogin(state: AppState, payload: boolean) {
    state.isLogin = payload;
  },
  HANDLER_MODAL_DELETE(state: AppState, payload: boolean) {
    state.isModalDelete = payload;
  },
  SET_MODAL_WORDS(state: AppState, payload: { title: string, isModal: boolean, list: WordInterface[]}) {
    state.isModalWords = payload.isModal
    state.startModalWords = { title: payload?.title, words: payload?.list }
  },
  SET_MODAL_SECTIONS(state: AppState, payload: boolean) {
    state.isModalSections = payload
  }
}

export default appMutations