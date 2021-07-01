<template>
  <ModalWords />
  <div class="account__wrapper" v-if="!isLoader">
    <div @mousedown="isOpenPanel = -1" class="account">
      <div class="account__left">
        <Profile @setModal="setModal" :profile="profile" />
        <DictionaryVidget />
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
        <v-pagination
          v-model="wordsIndex"
          :pages="reverseWords.length - 1"
          :range-size="1"
          active-color="#dddddd"
          @update:modelValue="editPage"
        />
      </div>
      <div v-else class="list__info">
        <p>Вы еще не создали ни один список!</p>
      </div>
    </div>
  </div>
  <Loader v-else />
</template>
<script lang="ts">
import VPagination from "vue3-pagination";
import "vue3-pagination/dist/vue3-pagination.css";
import "@/components/account/scss/Account.scss";
import { mapGetters } from "vuex";

import Loader from "../components/app/Loader.vue";
import ModalWords from "../components/account/ModalWords.vue";
import Profile from "../components/account/Profile.vue";
import FindWord from "../components/account/FindWord.vue";
import DictionaryVidget from "../components/account/DictionaryVidget.vue";
import WordsTable from "../components/account/WordsTable.vue";
import { defineComponent } from "vue";

const Component = defineComponent({
  name: "Account",
  components: {
    ModalWords,
    Loader,
    Profile,
    FindWord,
    WordsTable,
    DictionaryVidget,
    VPagination
  },
  data() {
    return {
      isOpenPanel: -1,
      wordsIndex: 1
    };
  },
  mounted() {
    this.editPage(1);
    this.$store.dispatch("getWords", this.userID);
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
    ...mapGetters([
      "userID",
      "currentWords",
      "isLoader",
      "profile",
      "findWords"
    ])
  },
  methods: {
    setModal(isModal: boolean) {
      this.$store.commit("SET_MODAL_WORDS", isModal)
    },
    setOpenPanel(num: number) {
      this.isOpenPanel = num;
    },
    editPage(num: number) {
      console.log(num);
      this.wordsIndex = num;
    },
    previousPage() {
      if (this.wordsIndex > 0) this.editPage(this.wordsIndex - 1);
    },
    nextPage() {
      if (this.wordsIndex < this.reverseWords.length - 1)
        this.editPage(this.wordsIndex + 1);
    }
  }
})

export default Component
</script>
