<template>
  <ModalWords :profile="profile" :isModal="isModal" :incorrectWords="incorrectWords" @setModal="setModal" />
  <div class="account__wrapper" v-if="!isModal && !isLoader"> 
    <div @mousedown="isOpenPanel = -1" class="account">
      <div class="profile">
        <div class="profile__content">
          <img src="@/assets/user.png" />
          <h2>{{ profile.login }}</h2>
          <p>{{ profile.email }}</p>
          <button class="profile__run" @click="setModal(true)">Добавить новые слова</button>
        </div>
      </div>
      <div class="list" @click="isOpenPanel = -1" v-if="currentWords != null && currentWords?.length > 0">
        <div class="list__content" v-for="(wordsArray, index) of reverseWords" :key="index">
          <div class="list__info" ref="listWords" @mousedown="setPanel" @contextmenu.prevent="isOpenPanel = index" @click="runWords(wordsArray.title)">
            <div ref="panel" @mousedown.stop @click.stop v-if="isOpenPanel == index" class="list__panel">
              <ul class="list__panel-content">
                <li class="list__panel-item">Изменить</li>
                <li class="list__panel-item" @click.stop="deleteWords(wordsArray.title)">Удалить</li>
                <li class="list__panel-item" @click="isOpenPanel = -1">Отмена</li>
              </ul>
            </div>
            <div class="list__title">
              <h3>{{ wordsArray.title }}</h3>
              <button @click.stop="isModal = false" class="profile__run">Обновить</button>
            </div>
            <div class="list__words" v-for="(words, index) of wordsArray.words" :key="index">
              <p class="list__item">
                <span class="list__english">{{ words.english }}</span>
                -
                <span class="list__russian">{{ words.russian }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="list__info">
          <p>Вы еще не создали ни один список!</p>
        </div>
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
import "@/components/account/Account.scss";

export default {
  name: "Account",
  components: { ModalWords, Loader },
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
      for (let i = this.currentWords.length - 1; i >= 0; i--) {
        newArray.push(this.currentWords[i])
      }
      return newArray;
    },
    ...mapGetters(["userID", "currentWords", "incorrectWords", "isLoader", "profile"])
  },
  methods: {
    setModal(isModal) {
      this.isModal = isModal;
    },
    runWords(title) {
      let index = this.currentWords.findIndex(wordsArray => title == wordsArray.title)
      this.$router.push(`/words/${this.userID}/${index}/?type=start`)
    },
    deleteWords(title) {
      let index = this.currentWords.findIndex(wordList => title == wordList.title)
      this.$store.dispatch("deleteWords", { title, index, wordsFull: this.currentWords, userID: this.userID, email: this.profile.email, login: this.profile.login })
    },
  }
};
</script>