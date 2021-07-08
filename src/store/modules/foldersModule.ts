import FoldersState from '@/models/folders';
import foldersActions from "../actions/foldersActions";
import foldersMutations from "../mutations/foldersMutations";

const foldersModule = {
  state: () => (<FoldersState>{
    routeFolder: "",
    folder: null,
    isLoaderItem: false
  }),
  mutations: foldersMutations,
  actions: foldersActions,
  getters: {
    folderAfterCreate: (state: FoldersState) => state.routeFolder,
    folder: (state: FoldersState) => state.folder,
    isLoaderItem: (state: FoldersState) => state.isLoaderItem
  },
};

export default foldersModule;
