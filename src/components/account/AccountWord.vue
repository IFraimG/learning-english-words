<template>
  <p class="list__item list__item-edit">
    <input v-model="wordEdit.english" class="list__english" :placeholder="wordData.english" />
    <span>-</span>
    <input v-model="wordEdit.russian" class="list__russian" :placeholder="wordData.russian" />
    <select-time :time-edit="wordData.currentTime" @setTime="setTime" />
  </p>
</template>

<script>
  import "@/components/account/scss/Account.scss"
  import SelectTime from "./SelectTime.vue"

  export default {
    name: "AccountWord",
    components: { SelectTime },
    props: {
      wordsTitle: Number,
      wordData: Object,
      index: Number,
    },
    emits: ["saveWord"],
    data() {
      return {
        wordEdit: {
          english: "",
          russian: "",
          currentTime: "",
          id: null,
        },
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
        console.log(time)
        this.wordEdit.currentTime = time
        this.$emit("saveWord", { index: this.index, word: this.wordEdit })
      },
    },
  }
</script>
