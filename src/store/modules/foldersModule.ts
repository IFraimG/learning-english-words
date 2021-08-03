import FoldersState from '@/models/folders';
import foldersActions from "../actions/foldersActions";
import foldersMutations from "../mutations/foldersMutations";

const foldersModule = {
  state: () => ({
    routeFolder: "",
    folder: null,
    isLoaderItem: false,
    foldersList: null
  } as FoldersState),
  mutations: foldersMutations,
  actions: foldersActions,
  getters: {
    folderAfterCreate: (state: FoldersState) => state.routeFolder,
    folder: (state: FoldersState) => state.folder,
    isLoaderItem: (state: FoldersState) => state.isLoaderItem,
    folders: (state: FoldersState) => state.foldersList,
    shortFolders: (state: FoldersState): any => {
      if (state.foldersList == null) return null

      let list: any = []
      Object.keys(state.foldersList).map(item => list.push({
        title: state.foldersList[item].title,
        listModules: state.foldersList[item]?.listModules,
        id: state.foldersList[item].id, key: item
      }))
      return list
    }
  },
};

export default foldersModule;
