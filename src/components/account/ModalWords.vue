<template>
  <div @click="$emit('setModal', false)" v-if="isModal" class="modal__wrapper">
    <div @click.stop v-if="isModal" class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h2>Создать список слов</h2>
          <input ref="inputTitle" v-model="titleWords" placeholder="Ваше название словаря..." type="text">
          <button @click="modalClose" class="profile__run modal__btn-image">
            <span>Закрыть</span>
            <img src="@/assets/cancel.png" alt="">
          </button>
        </div>
        <div class="modal__form">
          <div
            class="modal__item"
            v-for="(num, index) of wordsList.length + 1"
            :key="index"
          >
            <input-words
              :id="editData.id"
              v-model:english="editData.english"
              v-model:russian="editData.russian"
              v-model:currentTime="editData.currentTime"
              @setNumInput="setNumInput"
            />
          </div>
        </div>
        <div class="modal__errors-wrapper" v-if="incorrectWords != undefined">
          <div v-for="(errorWord, index) of incorrectWords" :key="index" class="modal__errors">
            <p class="modal__message">Данное слово введено неправильно!</p>
            <p v-if="errorWord.correct != undefined">Возможно вы имели ввиду: <span>{{ errorWord.correct }}</span></p>
          </div>
        </div>
        <div class="modal__footer">
          <button
            @click="sendData"
            type="submit"
            class="profile__run modal-button__run modal__save modal__btn-image"
          >
            <span>Сохранить</span>
            <img src="@/assets/save.png" alt="">
          </button>
          <button
            type="submit"
            class="profile__run modal__save modal__btn-image"
            @click="resetData"
          >
            <span>Очистить</span>
            <img src="@/assets/delete.png" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputWords from "./InputWords.vue";
import "./ModalWords.scss"
import { mapGetters } from "vuex"

export default {
  components: { InputWords },
  name: "ModalWords",
  data() {
    return {
      wordsList: [],
      titleWords: "",
      editData: {
        id: 1,
        english: "",
        russian: "",
        currentTime: null
      },
    };
  },
  props: {
    isModal: Boolean,
    profile: Object
  },
  computed: {
    ...mapGetters(["incorrectWords"])
  },
  methods: {
    resetData() {
      this.wordsList = [];
      this.titleWords = ""
      this.editData = { id: 1, english: "", russian: "", currentTime: null };
    },
    modalClose() {
      this.wordsList = []
      this.$emit('setModal', false)
    },
    sendData() {
      if (this.titleWords.length > 0) {
        this.$store.dispatch("createList", { profile: this.profile, list: this.wordsList, titleWords: this.titleWords });
        this.resetData();
        this.$emit("setModal", false);
      } else {
        this.$refs.inputTitle.placeholder = "Вы не ввели название !"
        this.$refs.inputTitle.classList.add("modal__header-error")
      }
    },
    setNumInput() {
      let newID = this.editData.id + 1;
      this.editData.id = this.wordsList.length + 1;
      // this.$store.dispatch("checkCorrectWord", { errors: this.incorrectWords, words: this.wordsList, id: this.editData.id })
      if (this.incorrectWords.length == 0) {
        this.wordsList.push(this.editData);
        this.editData = { id: newID, english: "", russian: "", currentTime: null };
      }
    },
  },
};
</script>
