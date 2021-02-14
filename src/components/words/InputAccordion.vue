<template>
  <label :for="'inputElement' + index">{{ words.russian }} - </label>
  <input :ref="'inputInfo' + index" type="text" :id="'inputElement' + index" />
  <button
    v-if="!doneWords.includes(words.english)"
    @click="$emit('checkWord', {wordInfo: words, index:index})"
  >
    <img src="@/assets/check.png" />
  </button>
  <img v-if="doneWords.includes(words.english)" src="@/assets/success.png" />
  <p v-if="errorWords.includes(words.english)" class="accordion__error">
    Слово введено неверно!
  </p>
</template>

<script>
export default {
  name: "InputAccordion",
  props: {
    words: Object,
    doneWords: Array,
    errorWords: Array,
    index: Number
  }
};
</script>