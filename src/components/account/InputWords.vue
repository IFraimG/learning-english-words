<template>
  <div class="modal__fields">
    <div class="modal__left">
      <input ref="englishWord" v-model="newWord.english" class="modal__input input-light" type="text" pattern="[A-Za-z]" placeholder="Слово на английском" @input="editDone(false)" />
      <input ref="russianWord" v-model="newWord.russian" class="modal__input input-light" type="text" pattern="[А-Яа-яЁё]" placeholder="Перевод слова на русском" @input="editDone(false)" />
      <select-time :time-edit="null" @setTime="setTime" />
    </div>
    <div class="modal__right">
      <button v-if="!isDone.value" class="profile__run modal-button__run  btn-add" @click="setNumInput">
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
  import { reactive, ref } from "vue"
  import "@/components/modals/scss/ModalWords.scss"
  import SelectTime from "./SelectTime.vue"

  export default {
    name: "InputWords",
    components: { SelectTime },
    props: {
      wordIndex: Number,
      isStartValue: Boolean,
      startValue: Object || null,
    },
    emits: ["setNumInput", "currentTime"],
    setup(props, { emit }) {
      const isDone = reactive({ value: false })
      const englishWord = ref(null)
      const russianWord = ref(null)

      const newWord = ref({ english: "", russian: "", id: "", currentTime: "" })

      const setNumInput = () => {
        if (newWord.value.english.trim() == "") {
          englishWord.value.style.border = "1px solid #f05454"
          russianWord.value.style.border = "1px solid transparent"
        } else if (newWord.value.russian.trim() == "") {
          russianWord.value.style.border = "1px solid #f05454"
          englishWord.value.style.border = "1px solid transparent"
        } else {
          englishWord.value.style.border = "1px solid #00af91"
          russianWord.value.style.border = "1px solid #00af91"

          emit("setNumInput", { word: newWord.value, index: props.wordIndex })
          editDone(true)
        }
      }

      const setTime = time => {
        editDone(false)
        newWord.value.currentTime = time
      }

      const editDone = done => (isDone.value = done)

      return {
        setNumInput,
        setTime,
        editDone,
        isDone,
        newWord,
        englishWord,
        russianWord,
      }
    },
  }
</script>
