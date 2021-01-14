<template>
  <ModalWords :isModal="isModal" :incorrectWords="incorrectWords" @setModal="setModal" />
  <div class="account__wrapper" v-if="!isModal"> 
    <div @mousedown="isOpenPanel = -1" class="account">
      <div class="profile">
        <div class="profile__content">
          <img src="@/assets/user.png" />
          <h2>Pushok</h2>
          <p>pushpush@mail.ru</p>
          <button class="profile__run" @click="setModal(true)">Добавить новые слова</button>
        </div>
      </div>
      <div class="list" @click="isOpenPanel = -1" v-if="this.currentWords != null">
        <div class="list__content" v-for="(wordsArray, index) of reverseWords" :key="index">
          <div class="list__info" ref="listWords" @mousedown="setPanel" @contextmenu.prevent="isOpenPanel = index" @click="runWords(index)">
            <div ref="panel" @click.stop v-if="isOpenPanel == index" class="list__panel">
              <ul class="list__panel-content">
                <li class="list__panel-item">Изменить</li>
                <li class="list__panel-item" @click="deleteWords(wordsArray, index)">Удалить</li>
                <li class="list__panel-item" @click="isOpenPanel = -1">Отмена</li>
              </ul>
            </div>
            <div class="list__title">
              <h3>Ваши последние ENGLISH WORDS</h3>
              <button @click.stop="isModal = false" class="profile__run">Обновить</button>
            </div>
            <div class="list__words" v-for="(words, index) of wordsArray" :key="index">
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
</template>
<script>
import ModalWords from '../components/account/ModalWords.vue';
import { mapGetters } from "vuex"
import "@/components/account/Account.scss";

export default {
  name: "Account",
  components: { ModalWords },
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
    ...mapGetters(["userID", "currentWords", "incorrectWords"])
  },
  methods: {
    setModal(isModal) {
      this.isModal = isModal;
    },
    runWords(wordsIndex) {
      this.$router.push(`/words/${this.userID}/${wordsIndex}/?type=start`)
    },
    deleteWords(words, index) {
      this.$store.dispatch("deleteWords", { words, index, userID: this.userID })
    },
  }
};
</script>