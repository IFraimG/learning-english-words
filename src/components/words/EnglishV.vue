<template>
  <div class="english-form__wrapper">
    <div class="english-form">
      <div class="nglish-form__content">
        <div class="english-form__header">
          <h2>Напишите перевод слова:</h2>
          <span>{{ wordData.english }}</span>
          <span v-if="wordData.currentTime != ''" class="english-form-time"> ({{ wordData.currentTime }}) </span>
        </div>
        <div class="english-form__middle">
          <input v-model="word.value" @keydown.enter="checkInput" type="text" />
          <button class="profile__run modal-button__run" @click="checkInput">
            Проверить
          </button>
        </div>
        <div class="english-form__result">
          <p v-if="isDone.value && !isError.value" class="english-form__success english-form__status">
            Молодец! Все верно!
          </p>
          <div v-if="isError.value" class="english-form__danger">
            <p class="english-form__danger english-form__status">
              Ответ неверный! Возможно перевод этого слова раннее был введен неккоректно.
            </p>
          </div>
        </div>
        <div class="english-form__footer">
          <button @click="$emit('previousTask')" class="profile__run" v-if="parseInt(taskNum) > 1">
            Вернуться
          </button>
          <button v-if="!isAnswer.value && !isDone.value && isError.value" @click="setAnswer(true)" class="profile__run modal-button__run">
            Посмотреть ответ
          </button>
          <button @click="nextTask" v-if="parseInt(taskNum) != len" class="profile__run modal-button__run">
            Далее
          </button>
          <button @click="setFinish" v-else class="profile__run modal-button__run">
            Завершить
          </button>
          <span class="english-form__answer" v-if="!isDone.value && isAnswer.value">
            <p>{{ wordData.russian }}</p>
            <img @click="setAnswer(false)" src="@/assets/close.png" alt="close" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { inject, reactive } from "vue"
  import "./scss/englishv/EnglishV.scss"

  export default {
    name: "EnglishV",
    props: {
      taskNum: String,
      len: Number,
    },
    emits: ["setFinishType", "nextTask", "previousTask"],
    setup(_, { emit }) {
      let wordData = inject("wordData")

      let isDone = reactive({ value: false })
      let isError = reactive({ value: false })
      let errorMessage = reactive({ value: "" })
      let errorsList = reactive({ value: [] })
      let word = reactive({ value: "" })
      let isAnswer = reactive({ value: false })

      const checkInput = () => {
        let translation = wordData.value.russian
          .trimLeft()
          .trimRight()
          .toLowerCase()
        let word2 = word.value
          .trimLeft()
          .trimRight()
          .toLowerCase()

        if (word2 != "") {
          if (translation == word2) {
            isDone.value = true
            isError.value = false
            errorMessage.value = ""
          } else {
            isError.value = true
            if (word2.length > 0) {
              let arrayErrors = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
              let newArray = []
              let errInfo = { translation: word.value, english: wordData.value.english }
              if (arrayErrors != null && arrayErrors != 0) {
                arrayErrors.map(item => {
                  if (item.english != wordData.english) newArray.push(item)
                })
              }
              newArray.push(errInfo)
              window.sessionStorage.setItem("wordsMistakes", JSON.stringify(newArray))

              let updateMistakes = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
              errorsList.value = updateMistakes
            } else errorMessage.value = "Вы не ввели слово"
          }
        }
      }

      const addSuccessWord = () => {
        if (isDone.value) {
          let arrayWords = JSON.parse(window.sessionStorage.getItem("words"))
          let newSuccessWord = {
            translation: word.value,
            english: wordData.english,
          }
          let newArrayWords = []
          if (arrayWords?.length > 0 && arrayWords != null) {
            arrayWords.map(item => {
              if (item.translation != newSuccessWord.translation) newArrayWords.push(item)
            })
          }
          newArrayWords.push(newSuccessWord)
          window.sessionStorage.setItem("words", JSON.stringify(newArrayWords))
        }
        isAnswer.value = false
        isError.value = false
        word.value = ""
        isDone.value = false
      }

      const setAnswer = isTrue => (isAnswer.value = isTrue)

      const nextTask = () => {
        addSuccessWord()
        emit("nextTask")
      }

      const setFinish = () => {
        addSuccessWord()
        emit("setFinishType")
      }

      return {
        wordData,
        setFinish,
        nextTask,
        addSuccessWord,
        checkInput,
        setAnswer,
        isDone,
        isError,
        errorMessage,
        errorsList,
        word,
        isAnswer,
      }
    },
  }
</script>
