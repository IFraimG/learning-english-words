<template>
  <div class="accordion__wrapper">
    <div class="accordion">
      <div class="accordion__content">
        <div class="accordion__header">
          <h1>Гармошка</h1>
          <button class="profile__run" @click="setVolume">
            <img v-if="isVolume" src="@/assets/turnon.png" />
            <img v-else src="@/assets/turnoff.png" />
          </button>
        </div>
        <div class="accordion__form">
          <div v-for="(words, index) of currentSortWords" :key="words.english" class="accordion__item">
            <label :for="'inputElement' + index">
              {{ words.russian }}
            </label>
            <label v-if="words?.ruValues != null" :for="'inputElement' + index">
              <span v-for="(ruWords, index) of words.ruValues" :key="index">, {{ ruWords }}</span>
            </label>
            <input :id="'inputElement' + index" :ref="el => { if (el) inputsInfo[index] = el }" type="text" @keyup.enter="checkWord(words, index)" />
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
              <span>
                <span>{{ words?.english }}</span>
                <span v-if="words?.enValues != null && words.enValues.length > 0">, </span>
              </span>
              <span v-if="words?.enValues != null">
                <span v-for="(enWords, index) of words.enValues" :key="index">
                  <span>{{ enWords }}</span>
                  <span v-if="index != words.enValues.length - 1">, </span>
                </span>
              </span>
              <img src="@/assets/close.png" alt="" @click="deleteAnswer(words.english)" />
            </p>
          </div>
        </div>
        <div class="accordion__footer">
          <button class="accordion__send profile__run" @click="rotateWords">
            Перевернуть гармошку
          </button>
          <router-link :to="{ name: 'Account' }">
            <button class="accordion__send profile__run">
              Завершить
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import "./scss/accordion/Accordion.scss"
  import { SpeechSythesis } from "@/models/speechSythesis"
  import { doneWords } from "./types/accordion.types"
  import { computed, defineComponent, ref } from "vue"
  import { WordInterface } from "@/models/words"

  // isRotate - true - en | !isRotate - false - ru
  export default defineComponent({
    name: "Accordion",
    props: {
      currentWords: Array as WordInterface[] | any
    },
    setup(props) {
      const currentInputWord = ref("")
      const doneWords = ref<doneWords[]>([])
      const errorWords = ref([])
      const isAnswer = ref<string[]>([])
      const checkedAnswers = ref([])
      const isRotate = ref(false)
      const inputsInfo = ref([])
      const isVolume = ref(true)

      const currentSortWords = computed(() => {
        const currentWords: WordInterface[] = [...props.currentWords]
        if (!isRotate.value) {
          currentWords.map((word: any) => {
            const tempRus = word.russian
            word.russian = word.english
            word.english = tempRus

            if (word?.enValues != null && word?.ruValues != null) {
              // russian = english
              if (word.enValues[0] == word.russian) word.enValues.shift()
              if (word.ruValues[0] == word.english) word.ruValues.shift()
              const tempRuValues = [...word.ruValues]

              word.ruValues = [...word.enValues]
              word.enValues = [...tempRuValues]
            }
          })
        } else {
          currentWords.map((word: any) => {
            const tempEn = word.english
            word.english = word.russian
            word.russian = tempEn

            if (word?.enValues != null && word?.ruValues != null) {
              // english == russian
              if (word.enValues[0] == word.russian) word.enValues.shift()
              if (word.ruValues[0] == word.english) word.ruValues.shift()
              const tempEnValues = [...word.enValues]

              word.enValues = [...word.ruValues]
              word.ruValues = [...tempEnValues]
            }
          })
        }

        return currentWords.sort(() => Math.random() - 0.5).reverse()
      })

      const addAnswer = (word: string) => isAnswer.value = [...isAnswer.value, word]

      const deleteAnswer = (word: string) => {
        const isIndex: number = isAnswer.value.findIndex((item: string) => item == word)
        if (isIndex != -1) isAnswer.value.splice(isIndex, 1)
      }

      const setVolume = () => isVolume.value = !isVolume.value

      const sendData = () => {
        const arrayWords = JSON.parse(window.sessionStorage.getItem("words") as string)
        if (arrayWords != null) window.sessionStorage.removeItem("words")

        const errorWords: any = JSON.parse(window.sessionStorage.getItem("wordsMistakes") as string)
        if (errorWords != null) window.sessionStorage.removeItem("wordsMistakes")

        const successWords: any[] = []
        const failedWords: any[] = []

        doneWords.value.map((item: any) => {
          props.currentWords.map((wordInfo: any) => {
            if (wordInfo.english == item.translated) successWords.push({ english: wordInfo.russian, id: wordInfo.id })
          })
        })
        errorWords.map((item: any) => {
          props.currentWords.map((wordInfo: any) => {
            if (wordInfo.english == item) failedWords.push({ english: item, id: wordInfo.id })
          })
        })
        window.sessionStorage.setItem("words", JSON.stringify(successWords))
        window.sessionStorage.setItem("wordsMistakes", JSON.stringify(failedWords))
      }

      const checkWord = (word: WordInterface, index: number) => {
        // @ts-ignore
        const value: any = inputsInfo.value[index.toString()].value
        if (word.enValues?.includes(value) || word.english == value) {
          // @ts-ignore
          inputsInfo.value[index].disabled = true

          const indexError = errorWords.value.indexOf(word.id as never)
          if (indexError != -1) errorWords.value.splice(indexError, 1)

          if (isRotate.value && isVolume.value) {
            const speechSythesis = new SpeechSythesis(value, "en-US")
            speechSythesis.render()
            speechSythesis.shooseSpeaker("Whisper")
            speechSythesis.speak()
          }
          deleteAnswer(word.english)
          doneWords.value.push({ translated: word.english, original: word.russian })
        } else {
          const indexError = errorWords.value.indexOf(word.id as never)
          if (indexError == -1) errorWords.value.push(word.id as never)
        }
      }

      const rotateWords = () => {
        doneWords.value = []
        errorWords.value = []
        isAnswer.value = []
        isRotate.value = !isRotate.value
      }

      return {
        rotateWords, currentSortWords, currentInputWord, doneWords,
        errorWords, inputsInfo, isAnswer, checkedAnswers, isRotate,
        addAnswer, deleteAnswer, sendData, checkWord, isVolume, setVolume
      }
    }
  })
</script>
