<template>
  <ModalWords :profile="profile" :isModal="isModal" @setModal="setModal" />
  <div class="account__wrapper" v-if="!isModal && !isLoader">
    <div @mousedown="isOpenPanel = -1" class="account">
      <Profile @setModal="setModal" :profile="profile" />
      <div class="list" @click="isOpenPanel = -1" v-if="currentWords != null && currentWords?.length > 0">
        <FindWord />
        <div class="list__content" v-for="(wordsArray, index) of reverseWords" :key="index">
          <WordsTable :wordsArray="wordsArray" :index="index" :isOpenPanel="isOpenPanel" @setOpenPanel="setOpenPanel" />
        </div>
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
import Loader from '../components/app/Loader.vue';
import ModalWords from '../components/account/ModalWords.vue';
import { mapGetters } from "vuex"
import Profile from '../components/account/Profile.vue';
import FindWord from '../components/account/FindWord.vue';
import WordsTable from '../components/account/WordsTable.vue';
import "@/components/account/scss/Account.scss";

export default {
  name: "Account",
  components: { ModalWords, Loader, Profile, FindWord, WordsTable },
  data() {
    return {
      isModal: false,
      isOpenPanel: -1
    }
  },
  created() {
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
    }
  }
};
</script>