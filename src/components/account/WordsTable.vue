<template>
  <div
    class="list__info"
    ref="listWords"
    @mousedown="setPanel"
    @contextmenu.prevent="$emit('setOpenPanel', index)"
    @click="runWords(wordsArray.title)"
  >
    <div
      ref="panel"
      @mousedown.stop
      @click.stop
      v-if="isOpenPanel == index && !editMode"
      class="list__panel"
    >
      <ul class="list__panel-content">
        <li class="list__panel-item" @click.stop="editWords(wordsArray.words, wordsArray.title)">
          Изменить
        </li>
        <li class="list__panel-item" @click.stop="deleteWords(wordsArray.title)">
          Удалить
        </li>
        <li class="list__panel-item" @click="$emit('setOpenPanel', -1)">Отмена</li>
      </ul>
    </div>
    <div class="list__title">
      <h3>{{ wordsArray.title }}</h3>
      <button
        v-if="editMode != wordsArray.title"
        @click.stop="editWords(wordsArray.words, wordsArray.title)"
        class="profile__run"
      >
        Редактировать
      </button>
      <button v-else @click.stop="stopEdit" class="profile__run">
        Отменить
      </button>
    </div>
    <div
      class="list__words"
      v-for="(words, index) of wordsArray.words"
      :key="index"
    >
      <p v-if="editMode != wordsArray.title" class="list__item">
        <span class="list__english">{{ words.english }}</span>
        -
        <span class="list__russian">{{ words.russian }}</span>
      </p>
      <account-word
        v-else
        :wordData="editList[index]"
        :title="wordsArray.title"
        :index="index"
        @saveWord="saveWord"
      />
    </div>
    <button
      v-if="editMode == wordsArray.title"
      @click.stop="saveEditWords(wordsArray.title, wordsArray.id)"
      class="profile__run"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import "@/components/account/scss/Account.scss";
import AccountWord from '@/components/account/AccountWord.vue';

export default {
  name: "WordsTable",
  components: { AccountWord },
  props: {
    wordsArray: Object,
    index: Number,
    isOpenPanel: Number
  },
  data() {
    return {
      editMode: false,
      editList: [],
    }
  },
  computed: {
    reverseWords() {
      let newArray = []
      for (let i = this.currentWords.length - 1; i >= 0; i--) {
        newArray.push(this.currentWords[i])
      }
      return newArray;
    },
    ...mapGetters(["userID", "currentWords", "isLoader", "profile"])
  },
  methods: {
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
