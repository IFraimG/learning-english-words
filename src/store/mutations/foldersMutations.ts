import { FolderItfc } from './../../models/folders';
import FoldersState from '@/models/folders';

const foldersMutations = {
  ROUTE_FOLDER: (state: FoldersState, payload: string) => {
    state.routeFolder = payload
  },
  SET_FOLDER: (state: FoldersState, payload: FolderItfc) => {
    state.folder = payload
  },
  SET_LOADER_ITEM: (state: FoldersState, payload: boolean) => {
    state.isLoaderItem = payload
  }
}

export default foldersMutations