<template>
  <div :class="styles.findWord__wrapper">
    <div :class="styles.findWord">
      <input v-model="moduleWords" type="search" placeholder="Название модуля..." @input="getWord" @keyup.enter="getWord" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue"
  import styles from "./scss/FindWord.module.scss"

  export default defineComponent({
    name: "FindWord",
    emits: {
      findItem: (word: string) => {
        return word.trim().length > 0
      },
      editPage: (num: number) => num == 1
    },
    setup(_: any, { emit }: any) {
      const moduleWords = ref("")
      const getWord = () => {
        emit("findItem", moduleWords.value)
        emit("editPage", 1)
      }

      return { moduleWords, getWord, styles }
    },
  })
</script>
