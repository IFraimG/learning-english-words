<template>
  <table @click="setTranscription(null, '')">
    <caption v-if="currentDictionary != null">
      {{ currentDictionary.title }}
    </caption>
    <thead class="dictionary__header">
      <tr>
        <th>Word</th>
        <th class="dictionary__transcription">Transcription</th>
        <th>Перевод</th>
      </tr>
    </thead>
    <tbody class="dictionary__content">
      <tr v-for="(wordInfo, index) of sortedWords" :key="index" class="dictionary__item">
        <td>{{ wordInfo.english }}</td>
        <td v-if="transcription != wordInfo.english" class="dictionary__transcription" @click.stop="setTranscription(wordInfo.english, wordInfo.transcription)">
          <span v-if="wordInfo?.transcription == null" class="dictionary__add-transcription">Добавить транскрипцию</span>
          <span v-else>{{ wordInfo.transcription }}</span>
        </td>
        <td v-else class="dictionary__transcription" @click.stop>
          <input v-model="newTranscription" type="text" @keydown.stop.esc="setTranscription(null, '')" @keydown.stop.enter="saveTranscription(wordInfo)" />
        </td>
        <td>{{ wordInfo.russian }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import { WordInterface } from "@/models/words"
  import { useStore } from "vuex";

  export default defineComponent({
    name: "DictionaryTable",
    props: {
      currentPage: Number
    },
    setup(props: any) {
      const store = useStore()
      const userID = computed(() => store.getters.userID)
      const currentDictionary = computed(() => store.getters.currentDictionary)
      const sortedWords = computed(() => store.getters.sortedWords)

      const transcription = ref<string | null>("")
      const newTranscription = ref<string | null>("")

      const setTranscription = (word: string, newTrscp: string) => {
        transcription.value = word
        newTranscription.value = newTrscp
      }

      const saveTranscription = async (wordInfo: WordInterface) => {
        const data = { ...wordInfo, transcription: newTranscription.value }
        const index = currentDictionary.value.words.findIndex((item: any) => item.id == wordInfo.id)

        if (index != -1) {
          await store.dispatch("saveDitionaryTranscription", {
            userID: userID.value,
            wordData: data,
            wordIndex: index,
            query: props.currentPage - 1,
          })
        }
        newTranscription.value = ""
        transcription.value = null
      }

      return {
        setTranscription, saveTranscription, transcription,
        sortedWords, currentDictionary, newTranscription
      }
    }
  })
</script>

<style></style>
