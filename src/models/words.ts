export interface IncorrectWordInterface {
    correct: string
    id: string
    incorrect: string
}

export default interface WordsInterface {
    incorrectWord: IncorrectWordInterface | null 
}