import AppState from '@/models/store';

const appMutations = {
  setLogin(state: AppState, payload: boolean) {
    state.isLogin = payload;
  },
  HANDLER_MODAL_DELETE(state: AppState, payload: boolean) {
    state.isModalDelete = payload;
  },
  SET_MODAL_WORDS(state: AppState, payload: boolean) {
    state.isModalWords = payload
  }
}

export default appMutations