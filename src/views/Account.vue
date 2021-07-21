<template>
  <div class="account__wrapper" v-if="!isLoader">
    <div @mousedown="isOpenPanel = -1" class="account">
      <div class="account__left">
        <Profile :profile="profile" />
        <DictionaryVidget />
        <CreateFolder />
      </div>
      <div
        class="list"
        @click="isOpenPanel = -1"
        v-if="currentWords != null && currentWords?.length > 0"
      >
        <FindWord />
        <div class="list__content">
          <WordsTable
            :wordsArray="reverseWords[wordsIndex]"
            :index="wordsIndex"
            :isOpenPanel="isOpenPanel"
            @setOpenPanel="setOpenPanel"
          />
        </div>
        <Paginator @nextPage="nextPage" @previousPage="previousPage">
          <template #default>
            <v-pagination
              v-model="wordsIndex"
              :pages="reverseWords.length - 1"
              :range-size="1"
              active-color="#dddddd"
              @update:modelValue="editPage"
            />
          </template>
        </Paginator>
      </div>
      <div v-else class="list__info">
        <p>Вы еще не создали ни один список!</p>
      </div>
    </div>
  </div>
  <router-view v-if="!isLoader"></router-view>
  <Loader v-else />
</template>
<script lang="ts">
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import "@/components/account/scss/Account.scss";
import { mapGetters } from "vuex";

import Loader from "../components/app/Loader.vue";
import Profile from "../components/account/Profile.vue";
import FindWord from "../components/account/FindWord.vue";
import DictionaryVidget from "../components/account/DictionaryVidget.vue";
import WordsTable from "../components/account/WordsTable.vue";
import CreateFolder from "../components/folders/CreateFolder.vue";
import { defineComponent } from "vue";
import Paginator from "@/components/app/Paginator.vue";

export default defineComponent({
  name: "Account",
  components: {
    Loader,
    Profile,
    FindWord,
    WordsTable,
    DictionaryVidget,
    VPagination,
    CreateFolder,
    Paginator
  },
  data() {
    return {
      isOpenPanel: -1,
      wordsIndex: 1
    };
  },
  mounted() {
    this.editPage(1);
    this.$store.dispatch("getWords");
  },
  computed: {
    reverseWords() {
      let newArray: Array<any> = [];
      let currentWords = this.currentWords;
      if (this.findWords.length > 0) currentWords = this.findWords;
      for (let i = currentWords.length - 1; i >= 0; i--) {
        newArray.push(currentWords[i]);
      }
      newArray.unshift({});
      return newArray;
    },
    ...mapGetters(["currentWords", "isLoader", "profile", "findWords"])
  },
  methods: {
    setOpenPanel(num: number) {
      this.isOpenPanel = num;
    },
    editPage(num: number) {
      this.wordsIndex = num;
    },
    previousPage() {
      if (this.wordsIndex > 1) this.editPage(this.wordsIndex - 1);
    },
    nextPage() {
      if (this.wordsIndex < this.reverseWords.length - 1) this.editPage(this.wordsIndex + 1);
    }
  }
})
</script>
