<template>
  <div class="dictionary">
    <div v-if="!isLoader && pagesDictionary != null">
      <FindWord @findItem="findModule" style="margin-top: 50px" />
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
          <tr
            v-for="(wordInfo, index) of sortedWords"
            :key="index"
            class="dictionary__item"
          >
            <td>{{ wordInfo.english }}</td>
            <td
              v-if="transcription != wordInfo.english"
              @click="setTranscription(wordInfo.english, wordInfo.transcription)"
              class="dictionary__transcription"
            >
              <span
                class="dictionary__add-transcription"
                v-if="wordInfo?.transcription == null"
                >Добавить транскрипцию</span
              >
              <span v-else>{{ wordInfo.transcription }}</span>
            </td>
            <td class="dictionary__transcription" v-else>
              <input
                type="text"
                v-model="newTranscription"
                @keydown.esc="setTranscription(null, '')"
                @keydown.enter="saveTranscription(wordInfo)"
              />
            </td>
            <td>{{ wordInfo.russian }}</td>
          </tr>
        </tbody>
      </table>
      <Paginator @nextPage="nextPage" @previousPage="previousPage">
        <template #default>
          <v-pagination
            v-model="currentColumn"
            :pages="pagesDictionary"
            :range-size="1"
            active-color="#dddddd"
            @update:modelValue="editPage"
          />
        </template>
      </Paginator>
    </div>
    <div style="margin-top: 50px; font-size: 32px" v-if="pagesDictionary == null && !isLoader">
      <h1>Ваш словарь пуст</h1>
    </div>
    <Loader v-if="isLoader" />
  </div>
</template>

<script lang="ts">
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import "@/components/dictionary/Dictionary.scss";
import { mapGetters } from "vuex";
import Loader from "../components/app/Loader.vue";
import Paginator from "../components/app/Paginator.vue";
import FindWord from "../components/account/FindWord.vue";
import { defineComponent } from "vue";

const Component = defineComponent({
  components: { Loader, VPagination, Paginator, FindWord },
  name: "Dictionary",
  data() {
    return {
      transcription: null as string | null,
      newTranscription: "",
      currentColumn: 1
    };
  },
  computed: {
    ...mapGetters([
      "userID",
      "currentWords",
      "pagesDictionary",
      "currentDictionary",
      "dictionaryList",
      "isLoader"
    ]),
    sortedWords(): Array<any> {
      let words = [...this.currentDictionary.words].sort((a, b) => a.english.charCodeAt(0) - b.english.charCodeAt(0));
      return words;
    }
  },
  async created() {
    this.editPage(1);
    await this.$store.dispatch("getDictionaryWords", this.userID);
    if (this.pagesDictionary == null) {
      this.$store.dispatch("addDictionaryWords", { id: this.userID, words: this.currentWords });
    }
  },
  methods: {
    editPage(page: number) {
      this.currentColumn = page;
      this.$store.dispatch("getCurrentDictionaryWords", { id: this.userID, query: this.currentColumn - 1 });
    },
    previousPage() {
      if (this.currentColumn > 1) this.editPage(this.currentColumn - 1);
    },
    nextPage() {
      if (this.currentColumn < this.pagesDictionary - 1)
        this.editPage(this.currentColumn + 1);
    },
    setTranscription(word: string, transcription: string) {
      this.transcription = word;
      this.newTranscription = transcription;
    },
    async saveTranscription(wordInfo: any) {
      let data = { ...wordInfo, transcription: this.newTranscription };
      let index = this.currentDictionary.words.findIndex((item: any) => item.id == wordInfo.id)

      await this.$store.dispatch("saveDitionaryTranscription", {
        userID: this.userID,
        wordData: data,
        wordIndex: index,
        query: this.currentColumn - 1
      });

      this.newTranscription = "";
      this.transcription = null;
    },
    findModule(title: string) {
      this.$store.commit("FIND_DICTIONARY_TITLE", title)
    }
  }
})

export default Component;
</script>
