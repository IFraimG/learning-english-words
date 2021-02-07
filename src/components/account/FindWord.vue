<template>
  <div class="find-word__wrapper">
    <div class="find-word">
      <input v-model="moduleWords" @input="getWord" @keyup.enter="getWord" type="search" placeholder="Название модуля...">
    </div>
  </div>
</template>

<script>
import "./scss/FindWord.scss"

export default {
  name: "FindWord",
  data() {
    return {
      moduleWords: "",
    }
  },
  methods: {
    getWord() {
      let word = this.moduleWords.trimLeft().trimRight().toLowerCase()
      this.$store.commit("FIND_TITLE", word)
    }
  }
}
</script>

<style>

</style>