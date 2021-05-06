<template>
  <div class="modal__fields">
    <div class="modal__left">
      <input
        class="modal__input"
        :ref="'englishWord' + id"
        v-model="newWord.english"
        @input="isDone = false"
        type="text"
        pattern="[A-Za-z]"
        placeholder="Слово на английском"
      />
      <input
        class="modal__input"
        v-model="newWord.russian"
        type="text"
        @input="isDone = false"
        :ref="'russianWord' + id"
        pattern="[А-Яа-яЁё]"
        placeholder="Перевод слова на русском"
      />
      <select-time :timeEdit="null" @setTime="setTime" />
    </div>
    <div class="modal__right">
      <button
        v-if="!isDone"
        class="profile__run modal-button__run modal__btn-image"
        @click="setNumInput"
      >
        <span>Добавить</span>
        <img src="@/assets/plus.png" />
      </button>
    </div>
  </div>
</template>

<script>
import "./scss/InputWords.scss";
import SelectTime from "./SelectTime.vue";

export default {
  components: { SelectTime },
  name: "InputWords",
  props: {
    editData: Object,
    wordIndex: Number
  },
  emits: ["setNumInput", "currentTime"],
  data() {
    return {
      isDone: false,
      isEdit: false,
      newWord: {
        english: "",
        russian: "",
        id: "",
        currentTime: ""
      }
    };
  },
  updated() {
    console.log(this.newWord);
  },
  methods: {
    setNumInput() {
      this.$emit("setNumInput", { word: this.newWord, index: this.wordIndex });
      this.isDone = true;
    },
    setTime(time) {
      this.isDone = false
      this.newWord.currentTime = time
    }
  }
};
</script>

<style lang="scss">
.modal {
  &-button__run {
    background-color: #30475e !important;
    &:active {
      background-color: #4a6c8d !important;
    }
  }
}
</style>
