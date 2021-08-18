<template>
  <div class="find-word__wrapper">
    <div class="find-word">
      <input v-model="moduleWords" type="search" placeholder="Название модуля..." @input="getWord" @keyup.enter="getWord" />
    </div>
  </div>
</template>

<script>
  import { ref } from "vue"
  import { useStore } from "vuex"

  export default {
    name: "FindWord",
    setup() {
      const store = useStore()
      const moduleWords = ref("")

      const getWord = () => {
        const word = moduleWords.value
          .trimLeft()
          .trimRight()
          .toLowerCase()
        store.commit("FIND_TITLE", word)
      }

      return {
        moduleWords,
        getWord,
      }
    },
  }
</script>
