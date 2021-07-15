import { WordInterface } from '@/models/words';
export default interface AppState {
    isLogin: boolean
    isModalDelete: boolean
    isModalWords: boolean
    startModalWords: WordInterface[] | null
    isModalSections: boolean
}