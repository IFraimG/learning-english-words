<template>
  <div class="dictionary">
    <div v-if="!isLoader && pagesDictionary != null">
      <table>
        <caption>{{ currentDictionary.title }}</caption>
        <thead class="dictionary__header">
          <tr>
            <th>Word</th>
            <th class="dictionary__transcription">Transcription</th>
            <th>Перевод</th>
          </tr>
        </thead>
        <tbody class="dictionary__content">
          <tr v-for="(wordInfo, index) of sortedWords" :key="index" class="dictionary__item">
            <td>{{wordInfo.english}}</td>
            <td
              v-if="transcription != wordInfo.english"
              @click="setTranscription(wordInfo.english, wordInfo.transcription)"
              class="dictionary__transcription"
            >
              <span>Добавить транскрипцию</span>
            </td>
            <td class="dictionary__transcription" v-else>
              <input type="text" v-model="newTranscription" @keydown.enter="saveTranscription(wordInfo)" />
            </td>
            <td>{{ wordInfo.russian }}</td>
          </tr>
        </tbody>
      </table>
      <Paginator
        :list="pagesDictionary"
        :activeElement="parseInt($route.query.column)"
        @editPage="editPage"
        @previousPage="previousPage"
        @nextPage="nextPage"
      />
    </div>
    <Loader v-if="isLoader" />
  </div>
</template>

<script>
import "@/components/dictionary/Dictionary.scss"
import { mapGetters } from 'vuex'
import Loader from '../components/app/Loader.vue'
import Paginator from '../components/app/Paginator.vue'

export default {
  components: { Loader, Paginator },
  name: "Dictionary",
  data() {
    return {
      transcription: null,
      newTranscription: ""
    }
  },
  computed: {
    ...mapGetters(["userID", "currentWords", "pagesDictionary", "currentDictionary", "isLoader"]),
    sortedWords() {
      let words = { ...this.currentDictionary }
      if (words.words?.length > 0 && words.words != null) return words.words.sort((a, b) => a.english.charCodeAt(0) < b.english.charCodeAt(0))
      else return this.currentDictionary
    }
  },
  async created() {
    this.editPage(1)
    await this.$store.dispatch("getWords", this.userID)
    await this.$store.dispatch("getDictionaryWords", this.userID)
    if (this.pagesDictionary == null) this.$store.dispatch("addDictionaryWords", { id: this.userID, words: this.currentWords })
  },
  methods: {
    editPage(page) {
      this.$router.push(`${this.$route.path}?column=${page}`)
      this.$store.dispatch("getCurrentDictionaryWords", {id: this.userID, query: parseInt(this.$route.query.column)})
    },
    previousPage() {
      let column = parseInt(this.$route.query.column)
      if (column > 1) this.editPage(--column)
    },
    nextPage() {
      let column = parseInt(this.$route.query.column)
      if (column != this.pagesDictionary) this.editPage(++column)
    },
    setTranscription(word, transcription) {
      this.transcription = word
      this.newTranscription = transcription
    },
    saveTranscription(wordInfo) {
      let data = { ...wordInfo, transcription: this.newTranscription }
      console.log(data);
      this.newTranscription = ""
      this.transcription = null
    }
  }
}
</script>