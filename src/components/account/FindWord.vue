<template>
  <div class="find-word__wrapper">
    <div class="find-word">
      <input v-model="moduleWords" type="search" placeholder="Название модуля..." @input="getWord" @keyup.enter="getWord" />
    </div>
  </div>
</template>

<script>
  import { ref } from "vue"
  import "./scss/FindWord.scss"

  export default {
    name: "FindWord",
    emits: ["findItem"],
    setup(_, { emit }) {
      const moduleWords = ref("")

      const getWord = () => {
        const word = moduleWords.value
          .trimLeft()
          .trimRight()
          .toLowerCase()
        emit("findItem", word)
      }

      return { moduleWords, getWord }
    },
  }
</script>
