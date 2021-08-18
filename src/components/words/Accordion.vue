<template>
  <div class="accordion__wrapper">
    <div class="accordion">
      <div class="accordion__content">
        <div class="accordion__header">
          <h1>Гармошка</h1>
        </div>
        <div class="accordion__form">
          <div v-for="(words, index) of currentSortWords" :key="words.english" class="accordion__item">
            <label :for="'inputElement' + index">{{ words.russian }} - </label>
            <input :id="'inputElement' + index" :ref="'inputInfo' + index" type="text" @keyup.enter="checkWord(words, index)" />
            <button v-if="!doneWords.some(wordItem => wordItem.translated == words.english && wordItem.original == words.russian)" @click="checkWord(words, index)">
              <img src="@/assets/check.png" />
            </button>
            <img v-if="doneWords.some(wordItem => wordItem.translated == words.english && wordItem.original == words.russian)" src="@/assets/success.png" />
            <p v-if="errorWords.includes(words.id)" class="accordion__error">
              Неверно!
            </p>
            <p v-if="errorWords.includes(words.id) && !isAnswer.includes(words.english)" class="accordion__answer" @click="addAnswer(words.english)">
              ответ
            </p>
            <p v-if="isAnswer.includes(words.english)" class="accordion__answer">
              {{ words.english }}
              <img src="@/assets/close.png" alt="" @click="deleteAnswer(words.english)" />
            </p>
          </div>
        </div>
        <div class="accordion__footer">
          <button class="accordion__send profile__run" @click="rotateWords">
            Перевернуть гармошку
          </button>
          <router-link :to="{ name: 'Account' }">
            <button class="accordion__send profile__run" @click="rotateWords">
              Завершить
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "./scss/accordion/Accordion.scss"

  export default {
    name: "Accordion",
    props: {
      currentWords: Array,
    },
    data() {
      return {
        currentInputWord: "",
        doneWords: [],
        errorWords: [],
        isAnswer: [],
        checkedAnswers: [],
        isRotate: false,
      }
    },
    computed: {
      currentSortWords() {
        const currentWords = [...this.currentWords]
        if (!this.isRotate) {
          currentWords.map(word => {
            const tempRus = word.russian
            word.russian = word.english
            word.english = tempRus
          })
        } else {
          currentWords.map(word => {
            const tempEn = word.english
            word.english = word.russian
            word.russian = tempEn
          })
        }
        return currentWords.sort(() => Math.random() - 0.5).reverse()
      },
    },
    methods: {
      addAnswer(words) {
        this.isAnswer.push(words)
      },
      deleteAnswer(words) {
        const isIndex = this.isAnswer.findIndex(item => item == words)
        if (isIndex != -1) this.isAnswer.splice(isIndex, 1)
      },
      checkWord(word, index) {
        const value = this.$refs["inputInfo" + index.toString()].value
        if (
          word.english
            .trimStart()
            .trimEnd()
            .toLowerCase() ==
          value
            .trimStart()
            .trimEnd()
            .toLowerCase()
        ) {
          this.$refs["inputInfo" + index.toString()].disabled = true
          const indexError = this.errorWords.indexOf(word.id)
          if (indexError != -1) this.errorWords.splice(indexError, 1)

          this.deleteAnswer(word.english)
          this.doneWords.push({ translated: word.english, original: word.russian })
        } else {
          const indexError = this.errorWords.indexOf(word.id)
          if (indexError == -1) this.errorWords.push(word.id)
        }
      },
      sendData() {
        const arrayWords = JSON.parse(window.sessionStorage.getItem("words"))
        if (arrayWords != null) window.sessionStorage.removeItem("words")

        const errorWords = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
        if (errorWords != null) window.sessionStorage.removeItem("wordsMistakes")

        const successWords = []
        const failedWords = []

        this.doneWords.map(item => {
          this.currentWords.map(wordInfo => {
            if (wordInfo.english == item.translated) successWords.push({ english: wordInfo.russian, id: wordInfo.id })
          })
        })
        this.errorWords.map(item => {
          this.currentWords.map(wordInfo => {
            if (wordInfo.english == item) failedWords.push({ english: item, id: wordInfo.id })
          })
        })
        window.sessionStorage.setItem("words", JSON.stringify(successWords))
        window.sessionStorage.setItem("wordsMistakes", JSON.stringify(failedWords))
      },
      rotateWords() {
        this.doneWords = []
        this.errorWords = []
        this.isAnswer = []
        this.isRotate = !this.isRotate
      },
    },
  }
</script>
