import { DictionaryListInterface } from "./dictionary"

export default interface FoldersState {
  routeFolder: string
  folder: FolderItfc | null
  isLoaderItem: boolean
  foldersList: FolderItfc[] | null | any
}

export interface FolderItfc {
  title: string
  id: string
  listModules: string[] | DictionaryListInterface[]
}

export interface KeyFolderItfc extends FolderItfc {
  key: string
}

export interface FolderShortItfc {
  title: string
  id: string
  key: string
  firstModule?: DictionaryListInterface | null
}
