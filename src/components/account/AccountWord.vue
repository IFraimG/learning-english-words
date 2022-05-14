<template>
  <p class="list__item list__item-edit">
    <input v-model="wordEdit.english" class="list__english" :placeholder="wordData.english" />
    <span>-</span>
    <input v-model="wordEdit.russian" class="list__russian" :placeholder="wordData.russian" />
    <select-time :time-edit="wordData.currentTime" @setTime="setTime" />
  </p>
</template>

<script lang="ts">
  import "./scss/Account.scss"
  import { WordEdit } from "@/models/words"
  import { defineComponent, onMounted, onUpdated, reactive, ref } from "@vue/runtime-core"
  import SelectTime from "./SelectTime.vue"

  export default defineComponent({
    name: "AccountWord",
    components: { SelectTime },
    props: {
      wordData: Object as any,
      index: Number,
    },
    emits: ["saveWord"],
    setup(props: any, { emit }: any) {
      let wordEdit = reactive<WordEdit>({
        english: "",
        russian: "",
        currentTime: "",
        id: null,
      })

      onMounted(() =>  wordEdit = { ...props.wordData })

      onUpdated(() => {
        if (wordEdit.english != "" && wordEdit.russian != "" && wordEdit.id != null) emit("saveWord", { index: props.index, word: wordEdit })
      })

      const setTime = (time: string) => {
        wordEdit.currentTime = time
        emit("saveWord", { index: props.index, word: wordEdit })
      }

      return { setTime, wordEdit }
    }
  })
</script>
