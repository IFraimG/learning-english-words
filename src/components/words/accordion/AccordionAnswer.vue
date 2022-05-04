<template>
  <p class="accordion__answer">
    <span>
      <span>{{ words?.english }}</span>
      <span v-if="words?.enValues != null && words.enValues.length > 0">, </span>
    </span>
    <span v-if="words?.enValues != null">
      <span v-for="(enWords, index) of words.enValues" :key="index">
        <span>{{ enWords }}</span>
        <span v-if="index != words.enValues.length - 1">, </span>
      </span>
    </span>
    <img src="@/assets/close.png" alt="close" @click="deleteAnswer(words.english)" />
  </p>
</template>

<script lang="ts">
  import { WordInterface } from "@/models/words"
  import { defineComponent } from "@vue/runtime-core"

  export default defineComponent({
    name: "AccordionAnswer",
    props: {
      words: Object as WordInterface | any
    },
    setup(props: any, { emit }: any) {
      const deleteAnswer = (word: string) => emit("deleteAnswer", word)

      return { deleteAnswer }
    }
  })
</script>
