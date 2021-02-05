<template>
  <div class="dictionary">
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
          <td class="dictionary__transcription">Добавить транскрипцию</td>
          <td>{{ wordInfo.russian }}</td>
        </tr>
      </tbody>
      <tfoot class="dictionary__footer">
        <tr>
          <span v-for="(page, index) of pagesDictionary" :key="index">
            <td @click="editPage(index)">
              {{ ++index }}
            </td>
          </span>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import "@/components/dictionary/Dictionary.scss"
import { mapGetters } from 'vuex'

export default {
  name: "Dictionary",
  computed: {
    ...mapGetters(["userID", "currentWords", "pagesDictionary", "currentDictionary"]),
    sortedWords() {
      let words = { ...this.currentDictionary }
      if (words.words?.length > 0 && words.words != undefined) return words.words.sort((a, b) => a.english.charCodeAt(0) < b.english.charCodeAt(0))
      else return this.currentDictionary
    }
  },
  async created() {
    this.editPage(1)
    await this.$store.dispatch("getWords", this.userID)
    await this.$store.dispatch("getDictionaryWords", this.userID)
    // this.$store.dispatch("addDictionaryWords", { id: this.userID, words: this.currentWords })
  },
  methods: {
    editPage(page) {
      this.$router.push(`${this.$route.path}?column=${page}`)
      this.$store.dispatch("getCurrentDictionaryWords", {id: this.userID, query: parseInt(this.$route.query.column)})
    }
  }
}
</script>

<style>

</style>