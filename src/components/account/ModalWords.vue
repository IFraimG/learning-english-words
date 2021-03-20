<template>
  <div @click="$emit('setModal', false)" v-if="isModal" class="modal__wrapper">
    <div @click.stop v-if="isModal" class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h2 ref="modalTitle">Создать список слов</h2>
          <input
            ref="inputTitle"
            v-model="titleWords"
            placeholder="Ваше название словаря..."
            type="text"
          />
          <button @click="modalClose" class="profile__run modal__btn-image">
            <span>Закрыть</span>
            <img src="@/assets/cancel.png" alt="" />
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
        <div class="modal__errors-wrapper" v-if="incorrectWord != null">
          <div class="modal__errors">
            <p class="modal__message">Данное слово введено неправильно!</p>
            <p v-if="incorrectWord.correct != undefined">
              Возможно вы имели ввиду: <span>{{ incorrectWord.correct }}</span>
            </p>
          </div>
        </div>
        <div class="modal__footer">
          <button
            @click="sendData"
            type="submit"
            class="profile__run modal-button__run modal__save modal__btn-image"
          >
            <span>Сохранить</span>
            <img src="@/assets/save.png" alt="" />
          </button>
          <button
            type="submit"
            class="profile__run modal__save modal__btn-image"
            @click="resetData"
          >
            <span>Очистить</span>
            <img src="@/assets/delete.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "./scss/ModalWords.scss";
import InputWords from "./InputWords.vue";

export default {
  components: { InputWords },
  name: "ModalWords",
  data() {
    return {
      wordsList: [],
      titleWords: "",
      editData: {
        id: "",
        english: "",
        russian: "",
        currentTime: null
      }
    };
  },
  props: {
    isModal: Boolean,
    profile: Object
  },
  computed: {
    ...mapGetters(["incorrectWord"])
  },
  methods: {
    resetData() {
      this.wordsList = [];
      this.titleWords = "";
      this.editData = { id: "", english: "", russian: "", currentTime: null };
      this.$store.commit("CHECK_CORRECT_WORD", null);
    },
    modalClose() {
      this.wordsList = [];
      this.$emit("setModal", false);
    },
    sendData() {
      if (this.wordsList.length == 0) {
        this.$refs.modalTitle.innerHTML = "Вы не заполнили словарь!";
        this.$refs.modalTitle.style.color = "red";
      } else {
        if (this.titleWords.length > 0) {
          this.$store.dispatch("createList", {
            profile: this.profile,
            list: this.wordsList,
            titleWords: this.titleWords
          });
          this.resetData();
          this.$emit("setModal", false);
        } else {
          this.$refs.inputTitle.placeholder = "Вы не ввели название !";
          this.$refs.inputTitle.classList.add("modal__header-error");
        }
      }
    },
    getWordID() {
      let text = "";
      let words =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 16; i++) {
        text += words.charAt(Math.floor(Math.random() * words.length));
      }
      return text;
    },
    checkValidID(id) {
      let isValid = false;
      this.wordsList.forEach(item => {
        if (item.id == id) isValid = true;
      });
      return isValid;
    },
    setNumInput() {
      let isValid = true;
      let id = "";
      while (isValid) {
        id = this.getWordID();
        isValid = this.checkValidID(id);
      }
      this.editData.id = id;
      this.$store
        .dispatch("checkCorrectWord", { wordData: this.editData })
        .then(() => {
          if (this.incorrectWord == null) {
            this.wordsList.push(this.editData);
            this.editData = {
              id: "",
              english: "",
              russian: "",
              currentTime: null
            };
          }
        });
    }
  }
};
</script>
