<template>
  <div @click="$emit('setModal', false)" v-if="isModal" class="modal__wrapper">
    <div @click.stop v-if="isModal" class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h2>Создать список слов</h2>
          <button @click="$emit('setModal', false)" class="profile__run">
            Закрыть
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
            class="profile__run modal-button__run modal__save"
          >
            Сохранить
          </button>
          <button
            type="submit"
            class="profile__run modal__save"
            @click="resetData"
          >
            Очистить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputWords from "./InputWords.vue";
import "./ModalWords.scss"

export default {
  components: { InputWords },
  name: "ModalWords",
  data() {
    return {
      wordsList: [],
      editData: {
        id: 1,
        english: "",
        russian: "",
      },
    };
  },
  props: {
    isModal: Boolean,
    incorrectWords: Array,
    profile: Object
  },
  methods: {
    resetData() {
      this.wordsList = [];
      this.editData = { id: 1, english: "", russian: "" };
    },
    sendData() {
      this.$store.dispatch("createList", { profile: this.profile, list: this.wordsList });
      this.resetData();
      this.$emit("setModal", false);
    },
    setNumInput() {
      let newID = this.editData.id + 1;
      this.editData.id = this.wordsList.length + 1;
      this.$store.dispatch("checkCorrectWord", { errors: this.incorrectWords, word: this.editData.english, id: this.editData.id })
      if (this.incorrectWords.length == 0) {
        this.wordsList.push(this.editData);
        // console.log(this.wordsList[this.editData.id - 1]);
        this.editData = { id: newID, english: "", russian: "" };
      }
      console.log(this.incorrectWords);
    },
  },
};
</script>
