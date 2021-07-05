<template>
  <div class="dictionary">
    <div v-if="!isLoader && pagesDictionary != null">
      <table>
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
          <tr
            v-for="(wordInfo, index) of sortedWords"
            :key="index"
            class="dictionary__item"
          >
            <td>{{ wordInfo.english }}</td>
            <td
              v-if="transcription != wordInfo.english"
              @click="
                setTranscription(wordInfo.english, wordInfo.transcription)
              "
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
                @keydown.enter="saveTranscription(wordInfo)"
              />
            </td>
            <td>{{ wordInfo.russian }}</td>
          </tr>
        </tbody>
      </table>
      <v-pagination
        v-model="currentColumn"
        :pages="pagesDictionary - 2"
        :range-size="1"
        active-color="#dddddd"
        @update:modelValue="editPage"
        style="margin-left: 20px"
      />
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
import { defineComponent } from "vue";

const Component = defineComponent({
  components: { Loader, VPagination },
  name: "Dictionary",
  data() {
    return {
      transcription: null as string | null,
      newTranscription: "" as string,
      currentColumn: 1 as number
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
      let words = [...this.currentDictionary.words].sort(
        (a, b) => a.english.charCodeAt(0) - b.english.charCodeAt(0)
      );
      return words;
    }
  },
  async created() {
    this.editPage(1);
    console.log(this.dictionaryList);
    await this.$store.dispatch("getDictionaryWords", this.userID);
    if (this.pagesDictionary == null)
      this.$store.dispatch("addDictionaryWords", {
        id: this.userID,
        words: this.currentWords
      });
  },
  methods: {
    editPage(page: number) {
      this.currentColumn = page;
      this.$store.dispatch("getCurrentDictionaryWords", {
        id: this.userID,
        query: this.currentColumn
      });
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
      await this.$store.dispatch("saveDitionaryTranscription", {
        userID: this.userID,
        wordData: data,
        wordIndex: wordInfo.id - 1,
        query: this.currentColumn
      });
      this.newTranscription = "";
      this.transcription = null;
    }
  }
})

export default Component;
</script>
