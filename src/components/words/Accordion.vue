<template>
  <div class="accordion__wrapper">
    <div class="accordion">
      <div class="accordion__content">
        <div class="accordion__header">
          <h1>Гармошка</h1>
        </div>
        <div class="accordion__form">
          <div class="accordion__item" v-for="(words, index) of currentWords" :key="index">
            <label :for="'inputElement' + index">{{words.russian}} - </label>
            <input :ref="'inputInfo' + index" type="text" :id="'inputElement' + index" />
            <button v-if="!doneWords.includes(words.english)" @click="checkWord(words, index)">
              <img src="@/assets/check.png" />
            </button>
            <img v-if="doneWords.includes(words.english)" src="@/assets/success.png" />
            <p v-if="errorWords.includes(words.english)" class="accordion__error">Слово введено неверно!</p>
          </div>
        </div>
        <button @click="sendData" class="accordion__send profile__run">Посмотреть результаты</button>
      </div>
    </div>
  </div>
</template>

<script>
import "./Accordion.scss";

export default {
  name: "Accordion",
  data() {
    return {
      currentInputWord: "",
      doneWords: [],
      errorWords: []
    }
  },
  props: {
    currentWords: Array
  },
  methods: {
    checkWord(wordInfo, index) {
      let value = this.$refs['inputInfo' + index.toString()].value;
      console.log(this.errorWords);
      if (wordInfo.english == value) {
        this.$refs['inputInfo' + index.toString()].disabled = true
        let indexError = this.errorWords.indexOf(wordInfo.english)
        if (indexError != -1) this.errorWords.splice(indexError, 1)
        this.doneWords.push(wordInfo.english)
      } else {
        let indexError = this.errorWords.indexOf(wordInfo.english)
        if (indexError == -1) this.errorWords.push(wordInfo.english)
      }
      console.log(this.errorWords);
    },
    sendData() {
      let arrayWords = JSON.parse(window.sessionStorage.getItem("words"))
      if (arrayWords != null) window.sessionStorage.removeItem("words")

      let errorWords = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
      if (errorWords != null) window.sessionStorage.removeItem("wordsMistakes")

      let successWords = []
      let failedWords = []

      this.doneWords.map(item => {
        this.currentWords.map(wordInfo => {
          if (wordInfo.english == item) successWords.push({ english: wordInfo.russian, id: wordInfo.id })
        })
      })
      this.errorWords.map(item => {
        this.currentWords.map(wordInfo => {
          if (wordInfo.english == item) failedWords.push({ english: item, id: wordInfo.id })
        })
      })
      window.sessionStorage.setItem("words", JSON.stringify(successWords))
      window.sessionStorage.setItem("wordsMistakes", JSON.stringify(failedWords))
      this.$emit('setFinishType')
    }
  }
}
</script>

<style>

</style>