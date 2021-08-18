import { CurrentDictionaryPayload, UpdateDictionaryIT, SaveTranscriptionIT } from "@/models/dictionary"
import dictionaryAPI from "../api/dictionaryAPI"

const dictionaryActions = {
  async getDictionaryWords({ commit }: any, payload: string) {
    try {
      const data = await dictionaryAPI.getWords(payload)
      commit("SET_DICTIONARY", data)
    } catch (error) {
      console.log(error)
    }
  },
  async getCurrentDictionaryWords({ commit }: any, payload: CurrentDictionaryPayload) {
    commit("SET_LOADER", true)

    const data = await dictionaryAPI.getCurrentWords(payload.id, payload.query)
    commit("SET_CURRENT_DICTIONARY", data)

    commit("SET_LOADER", false)
  },
  async addDictionaryWords({ dispatch }: any, payload: UpdateDictionaryIT) {
    await dictionaryAPI.updateWords(payload.id, payload.words)
    dispatch("getDictionaryWords", payload.id)
  },
  async saveDitionaryTranscription({ dispatch }: any, payload: SaveTranscriptionIT) {
    await dictionaryAPI.saveTranscripton(payload.userID, payload.query, payload.wordIndex, payload.wordData)
    dispatch("getCurrentDictionaryWords", { id: payload.userID, query: payload.query })
  },
}

export default dictionaryActions
