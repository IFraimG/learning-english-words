<template>
  <p class="list__item list__item-edit">
    <input class="list__english" v-model="wordEdit.english" :placeholder="wordData.english" />
    <span>-</span>
    <input class="list__russian" v-model="wordEdit.russian" :placeholder="wordData.russian" />
    <select-time :timeEdit="wordData.currentTime" @setTime="setTime" />
  </p>
</template>

<script>
import "@/components/account/Account.scss";
import SelectTime from './SelectTime.vue';

export default {
  components: { SelectTime },
  name: "AccountWord",
  props: {
    wordsTitle: String,
    wordData: Object,
    index: Number
  },
  data() {
    return {
      wordEdit: {
        english: "",
        russian: "",
        currentTime: "",
        id: null
      }
    }
  },
  created() {
    this.wordEdit = { ...this.wordData }
  },
  updated() {
    this.$emit("saveWord", { index: this.index, word: this.wordEdit })
  },
  methods: {
    setTime(time) {
      this.wordEdit.currentTime = time
    }
  }
};
</script>

<style>
</style>