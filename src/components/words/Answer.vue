<template>
  <div>
    <p @click="addAnswer(word)" class="accordion__answer">ответ</p>
    <p v-if="rule" class="accordion__answer">
      {{ word }}
      <img @click="deleteAnswer(word)" src="@/assets/close.png" alt="close" />
    </p>
  </div>
</template>

<script>
import "./scss/Accordion.scss";

export default {
  name: "Answer",
  props: {
    rule: Boolean,
    word: {
      type: String,
      required: true
    }
  },
  methods: {
    deleteAnswer(word) {
      this.$emit("deleteAnswer", word)
    },
    addAnswer(word) {
      this.$emit("addAnswer", word)
    }
  }
};
</script>