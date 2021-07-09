import { DictionaryListInterface } from "./dictionary";

export default interface FoldersState {
  routeFolder: string
  folder: FolderItfc | null
  isLoaderItem: boolean
  foldersList: FolderItfc[] | null
}

export interface FolderItfc {
  title: string
  id: string
  listModules?: DictionaryListInterface[]
}

export interface FolderShortItfc {
  title: string
  id: string
  key: string
  firstModule?: DictionaryListInterface | null
}