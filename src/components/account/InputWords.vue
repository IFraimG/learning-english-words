<template>
  <div class="modal__fields">
    <div class="modal__left">
      <input
        class="modal__input"
        ref="englishWord"
        v-model="newWord.english"
        @input="editDone(false)"
        type="text"
        pattern="[A-Za-z]"
        placeholder="Слово на английском"
      />
      <input
        class="modal__input"
        v-model="newWord.russian"
        type="text"
        @input="editDone(false)"
        ref="russianWord"
        pattern="[А-Яа-яЁё]"
        placeholder="Перевод слова на русском"
      />
      <select-time :timeEdit="null" @setTime="setTime" />
    </div>
    <div class="modal__right">
      <button
        v-if="!isDone"
        class="profile__run modal-button__run modal__btn-image modal-button__save "
        @click="setNumInput"
      >
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue"
import "./scss/InputWords.scss";
import SelectTime from "./SelectTime.vue";

export default {
  name: "InputWords",
  components: { SelectTime },
  props: {
    wordIndex: Number,
    isStartValue: Boolean,
    startValue: Object || null
  },
  emits: ["setNumInput", "currentTime"],
  setup(props, { emit }) {
    let isDone = reactive(false)
    let newWord = ref({
      english: "",
      russian: "",
      id: "",
      currentTime: ""
    })

    const setNumInput = () => {
      emit("setNumInput", { word: newWord.value, index: props.wordIndex });
      editDone(true)
    }

    const setTime = (time) => {
      editDone(false)
      newWord.value.currentTime = time
    }

    const editDone = (done) => isDone = done

    return { setNumInput, setTime, editDone, isDone, newWord }
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
