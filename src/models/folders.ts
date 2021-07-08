import { DictionaryListInterface } from "./dictionary";

export default interface FoldersState {
  routeFolder: string
  folder: FolderItfc | null
  isLoaderItem: boolean
}

export interface FolderItfc {
  title: string
  id: string
  listModules?: DictionaryListInterface[]
}