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
        v-if="!isDone.value"
        class="profile__run modal-button__run  btn-add"
        @click="setNumInput"
      >
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue"
import "@/components/modals/scss/ModalWords.scss";
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
    let isDone = reactive({ value: false })
    let englishWord = ref(null)
    let russianWord = ref(null)

    let newWord = ref({
      english: "",
      russian: "",
      id: "",
      currentTime: ""
    })

    const setNumInput = () => {
      if (newWord.value.english.trim() == "") {
        englishWord.value.style.border = "2px solid #f05454"
        russianWord.value.style.border = "1px solid rgb(118, 118, 118)"
      } else if (newWord.value.russian.trim() == "") {
        russianWord.value.style.border = "2px solid #f05454"
        englishWord.value.style.border = "1px solid rgb(118, 118, 118)"
      } else {
        englishWord.value.style.border = "1px solid rgb(118, 118, 118)"
        russianWord.value.style.border = "1px solid rgb(118, 118, 118)"

        emit("setNumInput", { word: newWord.value, index: props.wordIndex });
        editDone(true)
      }
    }

    const setTime = (time) => {
      editDone(false)
      newWord.value.currentTime = time
    }

    const editDone = (done) => isDone.value = done

    return {
      setNumInput, setTime, editDone,
      isDone, newWord, englishWord, russianWord
    }
  }
};
</script>