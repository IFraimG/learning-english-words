<template>
  <ModalWords :profile="profile" :isModal="isModal" :incorrectWords="incorrectWords" @setModal="setModal" />
  <div class="account__wrapper" v-if="!isModal && !isLoader"> 
    <div @mousedown="isOpenPanel = -1" class="account">
      <Profile @setModal="setModal" :profile="profile" />
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
              <button v-if="editMode != wordsArray.title" @click.stop="editWords(wordsArray.words, wordsArray.title)" class="profile__run">Редактировать</button>
              <button v-else @click.stop="stopEdit" class="profile__run">Отменить</button>
            </div>
            <div class="list__words" v-for="(words, index) of wordsArray.words" :key="index">
              <p v-if="editMode != wordsArray.title" class="list__item">
                <span class="list__english">{{ words.english }}</span>
                -
                <span class="list__russian">{{ words.russian }}</span>
              </p>
              <account-word v-else :wordData="editList[index]" :title="wordsArray.title" :index="index" @saveWord="saveWord" />
            </div>
            <button v-if="editMode == wordsArray.title" @click.stop="saveEditWords(wordsArray.title, wordsArray.id)" class="profile__run">Сохранить</button>
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
import AccountWord from '../components/account/AccountWord.vue';
import Profile from '../components/account/Profile.vue';

export default {
  name: "Account",
  components: { ModalWords, Loader, AccountWord, Profile },
  data() {
    return {
      isModal: false,
      editMode: false,
      editList: [],
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
      if (this.editMode != title) {
        let index = this.currentWords.findIndex(wordsArray => title == wordsArray.title)
        this.$router.push(`/words/${this.userID}/${index}/?type=start`)
      }
    },
    deleteWords(title) {
      let index = this.currentWords.findIndex(wordList => title == wordList.title)
      this.$store.dispatch("deleteWords", { title, index, wordsFull: this.currentWords, userID: this.userID, email: this.profile.email, login: this.profile.login })
    },
    editWords(words, title) {
      this.editMode = title
      this.editList = [...words]
    },
    stopEdit() {
      this.editList = []
      this.editMode = false
    },
    saveWord(data) {
      this.editList[data.index] = data.word
    },
    saveEditWords(title, id) {
      let index = this.currentWords.findIndex(wordList => title == wordList.title)
      this.$store.dispatch("sendEditWords", { title, id, editWords: this.editList, userid: this.userID, wordsid: index})
      this.stopEdit()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }
};
</script>