import FoldersState from "@/models/folders"
import foldersActions from "../actions/foldersActions"
import foldersMutations from "../mutations/foldersMutations"

const foldersModule = {
  state(): FoldersState {
    return {
      routeFolder: "",
      folder: null,
      isLoaderItem: false,
      foldersList: null,
    }
  },
  mutations: foldersMutations,
  actions: foldersActions,
  getters: {
    folderAfterCreate: (state: FoldersState) => state.routeFolder,
    folder: (state: FoldersState) => state.folder,
    isLoaderItem: (state: FoldersState) => state.isLoaderItem,
    folders: (state: FoldersState) => state.foldersList,
    shortFolders: (state: FoldersState) => {
      if (state.foldersList == null) return []

      const arr: any[] = []
      if (state.foldersList != null) {
        const keysArr: string[] = Object.keys(state.foldersList)

        keysArr.forEach((key: string, index: number) => arr[index] = {
          title: state.foldersList[key].title, id: state.foldersList[key].id,
          listModules: state.foldersList[key]?.listModules, key,
        })
      }

      return arr
    },
  },
}

export default foldersModule
