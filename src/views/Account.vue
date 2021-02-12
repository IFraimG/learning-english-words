<template>
  <ModalWords :profile="profile" :isModal="isModal" @setModal="setModal" />
  <div class="account__wrapper" v-if="!isModal && !isLoader">
    <div @mousedown="isOpenPanel = -1" class="account">
      <div class="account__left">
        <Profile @setModal="setModal" :profile="profile" />
        <DictionaryVidget />
      </div>
      <div class="list" @click="isOpenPanel = -1" v-if="currentWords != null && currentWords?.length > 0">
        <FindWord />
        <div class="list__content">
          <WordsTable :wordsArray="reverseWords[wordsIndex]" :index="wordsIndex" :isOpenPanel="isOpenPanel" @setOpenPanel="setOpenPanel" />
        </div>
        <Paginator
          v-if="reverseWords.length > 1"
          :list="reverseWords.length"
          @previousPage="previousPage"
          @nextPage="nextPage"
          :activeElement="wordsIndex"
          @editPage="editPage"
        />
      </div>
      <div v-else class="list__info">
        <p>Вы еще не создали ни один список!</p>
      </div>
    </div>
  </div>
  <div v-if="isLoader">
    <Loader />
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import "@/components/account/scss/Account.scss";
import Loader from '../components/app/Loader.vue';
import ModalWords from '../components/account/ModalWords.vue';
import Profile from '../components/account/Profile.vue';
import FindWord from '../components/account/FindWord.vue';
import DictionaryVidget from '../components/account/DictionaryVidget.vue';
import WordsTable from '../components/account/WordsTable.vue';
import Paginator from '../components/app/Paginator.vue';

export default {
  name: "Account",
  components: { ModalWords, Loader, Profile, FindWord, WordsTable, Paginator, DictionaryVidget },
  data() {
    return {
      isModal: false,
      isOpenPanel: -1,
      wordsIndex: 0
    }
  },
  mounted() {
    this.editPage(0)
    this.$store.dispatch("getWords", this.userID)
  },
  computed: {
    reverseWords() {
      let newArray = []
      let currentWords = this.currentWords
      if (this.findWords.length > 0) currentWords = this.findWords
      for (let i = currentWords.length - 1; i >= 0; i--) {
        newArray.push(currentWords[i])
      }
      return newArray;
    },
    ...mapGetters(["userID", "currentWords", "isLoader", "profile", "findWords"])
  },
  methods: {
    setModal(isModal) {
      this.isModal = isModal;
    },
    setOpenPanel(num) {
      this.isOpenPanel = num;
    },
    editPage(num) {
      this.wordsIndex = num
    },
    previousPage() {
      if (this.wordsIndex > 0) this.editPage(this.wordsIndex - 1)
    },
    nextPage() {
      if (this.wordsIndex < this.reverseWords.length - 1) this.editPage(this.wordsIndex + 1)
    }
  }
};
</script>