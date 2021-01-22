<template>
  <div class="english-form__wrapper">
    <div class="english-form">
      <div class="nglish-form__content">
        <div class="english-form__header">
          <h2>Напишите перевод слова:</h2>
          <p>{{ wordData.english }}</p>
        </div>
        <div class="english-form__middle">
          <input v-model="word" type="text">
          <button class="profile__run modal-button__run" @click="checkInput">Проверить</button>
        </div>
        <div class="english-form__result">
          <p v-if="isDone && !isError" class="english-form__success english-form__status">Молодец! Все верно!</p>
          <p v-else-if="isError && errorMessage.length == 0" class="english-form__danger english-form__status">
            Ответ неверный! Возможно перевод этого слова раннее был введен неккоректно.
          </p>
          <p v-else-if="isError && errorMessage.length > 0" class="english-form__danger english-form__status">
            {{ errorMessage }}
          </p>
        </div>
        <div class="english-form__footer">
          <button @click="$emit('previousTask')" class="profile__run" v-if="parseInt(taskNum) > 1">Вернуться</button>
          <button @click="nextTask" v-if="parseInt(taskNum) != len" class="profile__run modal-button__run">Далее</button>
          <button @click="setFinish" v-else class="profile__run modal-button__run">Завершить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./EnglishV.scss";

export default {
  name: "EnglishV",
  data() {
    return {
      isError: false,
      errorMessage: "",
      isDone: false,
      word: ""
    }
  },
  props: {
    wordData: Object,
    taskNum: String,
    len: Number
  },
  methods: {
    checkInput() {
      let translation = this.wordData.russian.trim().toLowerCase()
      let word = this.word.trimLeft().trimRight().toLowerCase()
      if (translation === word) {
        this.isDone = true
        this.isError = false
        this.errorMessage = "";
      } else {
        this.isError = true
        if (word.length > 0) {
          let arrayErrors = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
          let newArray = []
          let errInfo = { translation: word, english: this.wordData.english }
          if (arrayErrors != null) arrayErrors.map(item => { if (item.english != this.wordData.english) newArray.push(item) })
          newArray.push(errInfo)
          window.sessionStorage.setItem("wordsMistakes", JSON.stringify(newArray))
        } else this.errorMessage = "Вы не ввели слово"
      }
    },
    addSuccessWord() {
      if (this.isDone) {
        let arrayWords = JSON.parse(window.sessionStorage.getItem("words"))
        let newSuccessWord = { translation: this.word, english: this.wordData.english }
        let newArrayWords = []
        if (arrayWords.length > 0) {
          arrayWords.map(item => {
            if (item.translation != newSuccessWord.translation) newArrayWords.push(item)
          })
        }
        newArrayWords.push(newSuccessWord)
        window.sessionStorage.setItem("words", JSON.stringify(newArrayWords))
      }
      this.word = ""
      this.isDone = false
    },
    nextTask() {
      this.addSuccessWord()
      this.$emit('nextTask')
    },
    setFinish() {
      this.addSuccessWord()
      this.$emit('setFinishType')
    }
  }
}
</script>
