<script lang="ts">
  import VPagination from "@hennge/vue3-pagination"
  import "@hennge/vue3-pagination/dist/vue3-pagination.css"
  import "@/components/dictionary/scss/Dictionary.scss"
  import Loader from "../components/app/Loader.vue"
  import Paginator from "../components/app/Paginator.vue"
  import FindWord from "../components/account/FindWord.vue"
  import { defineComponent } from "vue"
  import { mapGetters } from "vuex"

  const Component = defineComponent({
    name: "Dictionary",
    components: { Loader, VPagination, Paginator, FindWord },
    data() {
      return {
        transcription: null as string | null,
        newTranscription: "",
        currentColumn: 1,
      }
    },
    computed: {
      ...mapGetters(["userID", "currentWords", "pagesDictionary", "currentDictionary", "dictionaryList", "isLoader"]),
      sortedWords(): Array<any> {
        const words = [...this.currentDictionary.words].sort((a, b) => a.english.charCodeAt(0) - b.english.charCodeAt(0))
        return words
      },
    },
    async created() {
      this.editPage(1)
      await this.$store.dispatch("getDictionaryWords", this.userID)
      if (this.pagesDictionary == null) {
        this.$store.dispatch("addDictionaryWords", {
          id: this.userID,
          words: this.currentWords,
        })
      }
    },
    methods: {
      editPage(page: number) {
        this.currentColumn = page
        this.$store.dispatch("getCurrentDictionaryWords", {
          id: this.userID,
          query: this.currentColumn - 1,
        })
      },
      previousPage() {
        if (this.currentColumn > 1) this.editPage(this.currentColumn - 1)
      },
      nextPage() {
        if (this.currentColumn < this.pagesDictionary - 1) this.editPage(this.currentColumn + 1)
      },
      setTranscription(word: string, transcription: string) {
        this.transcription = word
        this.newTranscription = transcription
      },
      async saveTranscription(wordInfo: any) {
        const data = { ...wordInfo, transcription: this.newTranscription }
        const index = this.currentDictionary.words.findIndex((item: any) => item.id == wordInfo.id)

        await this.$store.dispatch("saveDitionaryTranscription", {
          userID: this.userID,
          wordData: data,
          wordIndex: index,
          query: this.currentColumn - 1,
        })

        this.newTranscription = ""
        this.transcription = null
      },
      findModule(title: string) {
        this.$store.commit("FIND_DICTIONARY_TITLE", title)
      },
    },
  })

  export default Component
</script>

<template>
  <div class="dictionary">
    <div v-if="!isLoader && pagesDictionary != null">
      <FindWord style="margin-top: 50px" @findItem="findModule" />
      <table @click="setTranscription(null, '')">
        <caption>
          {{
            currentDictionary.title
          }}
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
      <Paginator @nextPage="nextPage" @previousPage="previousPage">
        <template #default>
          <VPagination v-model="currentColumn" :pages="pagesDictionary" :range-size="1" active-color="#dddddd" @update:modelValue="editPage" />
        </template>
      </Paginator>
    </div>
    <div v-if="pagesDictionary == null && !isLoader" style="margin-top: 50px; font-size: 32px">
      <h1>Ваш словарь пуст</h1>
    </div>
    <Loader v-if="isLoader" />
  </div>
</template>
