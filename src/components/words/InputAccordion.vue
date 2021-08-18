<template>
  <label :for="'inputElement' + index">{{ words.russian }} - </label>
  <input :id="'inputElement' + index" :ref="'inputInfo' + index" type="text" @keypress.enter="checkWord" />
  <button v-if="!doneWords.includes(words.english)" @click="checkWord">
    <img src="@/assets/check.png" />
  </button>
  <img v-if="doneWords.includes(words.english)" src="@/assets/success.png" />
  <p v-if="errorWords.includes(words.english)" class="accordion__error">
    Слово введено неверно!
  </p>
</template>

<script lang="ts">
  // не используется !!!!
  export default {
    name: "InputAccordion",
    props: {
      words: Object,
      doneWords: Array,
      errorWords: Array,
      index: Number,
    },
    emits: ["checkWord"],
    setup(props: any, { emit }) {
      const checkWord = () => emit("checkWord", { wordInfo: props.words, index: props.index })

      return { checkWord }
    },
  }
</script>
