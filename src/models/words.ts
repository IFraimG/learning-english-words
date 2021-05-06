export interface IncorrectWordInterface {
  correct: string
  id: string
  incorrect: string
}

export default interface WordsInterface {
  incorrectWord: IncorrectWordInterface | null
}

export interface WordInterface {
  english: string
  russian: string
  id: number
  transcription?: string
  currentTime?: string
}