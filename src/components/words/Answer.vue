<template>
  <div>
    <p class="accordion__answer" @click="addAnswer(word)">ответ</p>
    <p v-if="rule" class="accordion__answer">
      {{ word }}
      <img src="@/assets/close.png" alt="close" @click="deleteAnswer(word)" />
    </p>
  </div>
</template>

<script>
  import "./scss/Accordion.scss"

  export default {
    name: "Answer",
    props: {
      rule: Boolean,
      word: {
        type: String,
        required: true,
      },
    },
    methods: {
      deleteAnswer(word) {
        this.$emit("deleteAnswer", word)
      },
      addAnswer(word) {
        this.$emit("addAnswer", word)
      },
    },
  }
</script>
