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
          <input v-model="word.value" type="text" @keydown.enter="checkInput" />
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
          <button v-if="parseInt(taskNum) > 1" class="profile__run" @click="$emit('previousTask')">
            Вернуться
          </button>
          <button v-if="!isAnswer.value && !isDone.value && isError.value" class="profile__run modal-button__run" @click="setAnswer(true)">
            Посмотреть ответ
          </button>
          <button v-if="parseInt(taskNum) != len" class="profile__run modal-button__run" @click="nextTask">
            Далее
          </button>
          <button v-else class="profile__run modal-button__run" @click="setFinish">
            Завершить
          </button>
          <span v-if="!isDone.value && isAnswer.value" class="english-form__answer">
            <p>{{ wordData.russian }}</p>
            <img src="@/assets/close.png" alt="close" @click="setAnswer(false)" />
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
      const wordData = inject("wordData")

      const isDone = reactive({ value: false })
      const isError = reactive({ value: false })
      const errorMessage = reactive({ value: "" })
      const errorsList = reactive({ value: [] })
      const word = reactive({ value: "" })
      const isAnswer = reactive({ value: false })

      const checkInput = () => {
        const translation = wordData.value.russian
          .trimLeft()
          .trimRight()
          .toLowerCase()
        const word2 = word.value
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
              const arrayErrors = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
              const newArray = []
              const errInfo = { translation: word.value, english: wordData.value.english }
              if (arrayErrors != null && arrayErrors != 0) {
                arrayErrors.map(item => {
                  if (item.english != wordData.english) newArray.push(item)
                })
              }
              newArray.push(errInfo)
              window.sessionStorage.setItem("wordsMistakes", JSON.stringify(newArray))

              const updateMistakes = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
              errorsList.value = updateMistakes
            } else errorMessage.value = "Вы не ввели слово"
          }
        }
      }

      const addSuccessWord = () => {
        if (isDone.value) {
          const arrayWords = JSON.parse(window.sessionStorage.getItem("words"))
          const newSuccessWord = {
            translation: word.value,
            english: wordData.english,
          }
          const newArrayWords = []
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
