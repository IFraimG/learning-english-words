import { WordInterface } from '@/models/words';
export default interface AppState {
    isLogin: boolean
    isModalDelete: boolean
    isModalWords: boolean
    startModalWords: { words: WordInterface[] | null, title: string | null }
    isModalSections: boolean
}