<template>
  <div class="english-form__wrapper">
    <div class="english-form">
      <div class="nglish-form__content">
        <div class="english-form__header">
          <h2>Напишите перевод слова:</h2>
          <span>{{ wordData.english }}</span>
          <span v-if="wordData.currentTime != null" class="english-form-time">({{ wordData.currentTime }})</span>
        </div>
        <div class="english-form__middle">
          <input v-model="word" type="text">
          <button class="profile__run modal-button__run" @click="checkInput">Проверить</button>
        </div>
        <div class="english-form__result">
          <p v-if="isDone && !isError" class="english-form__success english-form__status">Молодец! Все верно!</p>
          <p v-if="isError" class="english-form__danger">
            <span v-for="(err, index) of errorsList" :key="index">
              <p v-if="err.english == wordData.english" class="english-form__danger english-form__status">
                Ответ неверный! Возможно перевод этого слова раннее был введен неккоректно.
              </p>
            </span>
          </p>
        </div>
        <div class="english-form__footer">
          <button @click="$emit('previousTask')" class="profile__run" v-if="parseInt(taskNum) > 1">Вернуться</button>
          <button
            v-if="!isAnswer && !isDone && isError"
            @click="isAnswer = true"
            class="profile__run modal-button__run"
          >
            Посмотреть ответ
          </button>
          <button @click="nextTask" v-if="parseInt(taskNum) != len" class="profile__run modal-button__run">Далее</button>
          <button @click="setFinish" v-else class="profile__run modal-button__run">Завершить</button>
          <span class="english-form__answer" v-if="!isDone && isAnswer">
            <p>{{ wordData.russian }}</p>
            <img @click="isAnswer = false" src="@/assets/close.png" alt="close" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./scss/EnglishV.scss";

export default {
  name: "EnglishV",
  data() {
    return {
      isError: false,
      errorMessage: "",
      errorsList: [],
      isDone: false,
      word: "",
      isAnswer: false
    }
  },
  props: {
    wordData: Object,
    taskNum: String,
    len: Number
  },
  methods: {
    checkInput() {
      let translation = this.wordData.russian.trimLeft().trimRight().toLowerCase()
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
          if (arrayErrors != null && arrayErrors != 0) arrayErrors.map(item => { if (item.english != this.wordData.english) newArray.push(item) })
          newArray.push(errInfo)
          window.sessionStorage.setItem("wordsMistakes", JSON.stringify(newArray))

          let updateMistakes = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
          this.errorsList = updateMistakes
        } else this.errorMessage = "Вы не ввели слово"
      }
    },
    addSuccessWord() {
      if (this.isDone) {
        let arrayWords = JSON.parse(window.sessionStorage.getItem("words"))
        let newSuccessWord = { translation: this.word, english: this.wordData.english }
        let newArrayWords = []
        if (arrayWords?.length > 0 && arrayWords != null) {
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
