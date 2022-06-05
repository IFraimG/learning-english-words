<template>
  <div class="english-form__wrapper">
    <div class="english-form">
      <div class="nglish-form__content">
        <div class="english-form__header">
          <h2>Напишите перевод слова:</h2>
          <div class="english-form-title">
            <span>{{ wordData.english }}</span>
            <words-image :img-url="wordData.img"  />
          </div>
          <!-- <span v-if="wordData.currentTime != ''" class="english-form-time"> ({{ wordData.currentTime }}) </span> -->
        </div>
        <div class="english-form__middle">
          <input ref="inputWord" v-model="word.value" type="text" @keydown.enter="checkInput" />
          <button class="profile__run modal-button__run" @click="checkInput">
            Проверить
          </button>
        </div>
        <correct-answer :isDone="isDone.value" :isError="isError.value" />
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

<script lang="ts">
  import { defineComponent, inject, reactive, ref } from "vue"
  import "./scss/englishv/EnglishV.scss"
  import CorrectAnswer from "./CorrectAnswer.vue"
  import { useRoute, useRouter } from "vue-router"
  import WordsImage from "./WordsImage.vue"

  export default defineComponent({
    components: { CorrectAnswer, WordsImage },
    name: "EnglishV",
    props: {
      taskNum: {
        type: String,
        default: ""
      },
      len: Number,
    },
    emits: ["setFinishType", "nextTask", "previousTask", "openImage"],
    setup(_, { emit }) {
      const wordData: any = inject("wordData")
      const inputWord = ref(null)

      const router = useRouter()
      const route = useRoute()

      const isDone = reactive < { value: boolean } > ({ value: false })
      const isError = reactive < { value: boolean } > ({ value: false })
      const errorMessage = reactive < { value: string } > ({ value: "" })
      const word = reactive < { value: string } > ({ value: "" })
      const isAnswer = reactive < { value: boolean } > ({ value: false })

      const checkInput = () => {
        const translation = wordData.value.russian
          .trimStart()
          .trimEnd()
          .toLowerCase()
        const word2 = word.value
          .trimStart()
          .trimEnd()
          .toLowerCase()

        if (word2 != "") {
          if (translation == word2) {
            isDone.value = true
            isError.value = false
            errorMessage.value = ""
          } else {
            isError.value = true
            if (word2.length > 0) {
              // @ts-ignore
              const arrayErrors = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
              const newArray = []
              const errInfo = { translation: word.value, english: wordData.value.english }
              if (arrayErrors != null && arrayErrors != 0) {
                arrayErrors.map((item: any) => {
                  if (item.english != wordData.english) newArray.push(item)
                })
              }
              newArray.push(errInfo)
              window.sessionStorage.setItem("wordsMistakes", JSON.stringify(newArray))
            } else errorMessage.value = "Вы не ввели слово"
          }
        } else setAnswer(true)

        document.addEventListener("keydown", event => {
          if (event.key == "Enter" && isDone.value && !isError.value && inputWord.value != document.activeElement) nextTask()
        })
      }

      const addSuccessWord = () => {
        if (isDone.value) {
          // @ts-ignore
          const arrayWords = JSON.parse(window.sessionStorage.getItem("words"))
          const newSuccessWord = { translation: word.value, english: wordData.english }
          let newArrayWords = []

          if (arrayWords?.length > 0 && arrayWords != null) newArrayWords = arrayWords.filter((item: any) => item.translation != newSuccessWord.translation)
          newArrayWords.push(newSuccessWord)
          window.sessionStorage.setItem("words", JSON.stringify(newArrayWords))
        }
        isAnswer.value = false
        isError.value = false
        word.value = ""
        isDone.value = false
      }

      const setAnswer = (isTrue: boolean) => (isAnswer.value = isTrue)

      const nextTask = () => {
        wordData.img = null
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
        word,
        isAnswer,
        inputWord
      }
    }
  })
</script>
