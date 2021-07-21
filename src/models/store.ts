import { WordInterface } from '@/models/words';
export default interface AppState {
    isLogin: boolean
    startModalWords: { words: WordInterface[] | null, title: string | null }
}