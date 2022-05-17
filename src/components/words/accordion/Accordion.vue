<template>
  <div class="accordion__form">
    <div v-for="(words, index) of currentSortWords" :key="words.english" class="accordion__item">
      <div class="accordion__item-left">
        <label :for="'inputElement' + index">
          {{ words.russian }}
        </label>
        <label v-if="words?.ruValues != null" :for="'inputElement' + index">
          <span v-for="(ruWords, index) of words.ruValues" :key="index">, {{ ruWords }}</span>
        </label>
        <input
          :id="'inputElement' + index"
          :ref="el => { if (el) inputsInfo[index] = el }"
          type="text"
          @keyup.enter="checkWord(words, index)"
        />
        <img class="accordion__image" v-if="words.img != null" :src="words.img" alt="img">
        <button v-if="!doneWords.some(wordItem => wordItem.translated == words.english && wordItem.original == words.russian)" @click="checkWord(words, index)">
          <img src="@/assets/check.png" />
        </button>
      </div>
      <div class="accordion__item-right">
        <img v-if="doneWords.some(wordItem => wordItem.translated == words.english && wordItem.original == words.russian)" src="@/assets/success.png" />
        <p v-if="errorWords.includes(words.id)" class="accordion__error">
          Неверно!
        </p>
        <p v-if="errorWords.includes(words.id) && !isAnswer.includes(words.english)" class="accordion__answer" @click="addAnswer(words.english)">
          ответ
        </p>
        <AccordionAnswer v-if="isAnswer.includes(words.english)" @deleteAnswer="deleteAnswer" :words="words" />
      </div>
    </div>
  </div>
  <AccordionFooter @rotateWords="rotateWords" />
</template>

<script lang="ts">
  import "./scss/Accordion.scss"
  import { SpeechSythesis } from "@/models/speechSythesis"
  import { doneWords, successAndFailedWords } from "./types/accordion.types"
  import { computed, defineComponent, Ref, ref } from "vue"
  import { WordInterface } from "@/models/words"
  import AccordionFooter from "./AccordionFooter.vue"
  import AccordionAnswer from "./AccordionAnswer.vue"

  // isRotate - true - en | !isRotate - false - ru
  export default defineComponent({
    name: "Accordion",
    components: { AccordionFooter, AccordionAnswer },
    props: {
      currentWords: Array as WordInterface[] | any,
      isVolume: Boolean
    },
    setup(props) {
      const currentInputWord: Ref<string> = ref("")
      const doneWords: Ref<doneWords[]> = ref([])
      const errorWords: Ref<number[]> = ref([])
      const isAnswer: Ref<string[]> = ref([])
      const isRotate: Ref<boolean> = ref(false)
      const inputsInfo: Ref<number[] | any> = ref([])

      const currentSortWords = computed(() => {
        const currentWords: WordInterface[] = [...props.currentWords]
        if (!isRotate.value) {
          currentWords.map((word: WordInterface) => {
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
          currentWords.map((word: WordInterface) => {
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

      const addAnswer = (word: string) => (isAnswer.value = [...isAnswer.value, word])

      const deleteAnswer = (word: string) => {
        const isIndex: number = isAnswer.value.findIndex((item: string) => item == word)
        if (isIndex != -1) isAnswer.value.splice(isIndex, 1)
      }

      const sendData = () => {
        const arrayWords = JSON.parse(window.sessionStorage.getItem("words") as string)
        if (arrayWords != null) window.sessionStorage.removeItem("words")

        const errorWords: any = JSON.parse(window.sessionStorage.getItem("wordsMistakes") as string)
        if (errorWords != null) window.sessionStorage.removeItem("wordsMistakes")

        const successWords: successAndFailedWords[] = []
        const failedWords: successAndFailedWords[] = []

        doneWords.value.map((item: doneWords) => {
          props.currentWords.map((wordInfo: WordInterface) => {
            if (wordInfo.english == item.translated) successWords.push({ english: wordInfo.russian, id: wordInfo.id })
          })
        })
        errorWords.map((item: any) => {
          props.currentWords.map((wordInfo: WordInterface) => {
            if (wordInfo.english == item) failedWords.push({ english: item, id: wordInfo.id })
          })
        })
        window.sessionStorage.setItem("words", JSON.stringify(successWords))
        window.sessionStorage.setItem("wordsMistakes", JSON.stringify(failedWords))
      }

      const checkWord = (word: WordInterface, index: number) => {
        const value = inputsInfo.value[index.toString()].value

        if (word.enValues?.includes(value) || word.english == value) {
          inputsInfo.value[index].disabled = true

          const indexError = errorWords.value.indexOf(word.id)
          if (indexError != -1) errorWords.value.splice(indexError, 1)

          if (isRotate.value && props.isVolume) {
            const speechSythesis = new SpeechSythesis(value, "en")
            speechSythesis.render()
            speechSythesis.shooseSpeaker("Whisper")
            speechSythesis.speak()
          }

          deleteAnswer(word.english)
          doneWords.value.push({ translated: word.english, original: word.russian })
        } else {
          if (errorWords.value.includes(word.id) && !isAnswer.value.includes(word.english)) addAnswer(word.english)
          else {
            const indexError = errorWords.value.indexOf(word.id)
            if (indexError == -1) errorWords.value.push(word.id)
          }
        }
      }

      const rotateWords = () => {
        doneWords.value = []
        errorWords.value = []
        isAnswer.value = []
        isRotate.value = !isRotate.value
      }

      return {
        rotateWords,currentSortWords, currentInputWord, doneWords, errorWords, inputsInfo, isAnswer,
        isRotate, addAnswer,  deleteAnswer, sendData, checkWord
      }
    },
  })
</script>
