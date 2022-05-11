<template>
  <div class="find-word__wrapper">
    <div class="find-word">
      <input v-model="moduleWords" type="search" placeholder="Название модуля..." @input="getWord" @keyup.enter="getWord" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue"
  import "./scss/FindWord.scss"

  export default defineComponent({
    name: "FindWord",
    emits: ["findItem"],
    setup(_: any, { emit }: any) {
      const moduleWords = ref("")
      const getWord = () => {
        emit("editPage", 1)
        emit("findItem", moduleWords.value)
      }

      return { moduleWords, getWord }
    },
  })
</script>
