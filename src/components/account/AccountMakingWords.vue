<template>
  <div ref="modalWordsWrap" class="list__info make-words__wrapper">
    <div ref="modalContent" class="make-words">
      <div class="make-words__content">
        <div class="make-words__header">
          <h2 v-if="startWords.title == null" ref="modalTitle">{{ t("account.modalWords.makeList") }}</h2>
          <h2 v-else ref="modalTitle">{{ t("account.modalWords.addNewWords") }}</h2>
          <input class="input-focus" v-if="startWords.title == null" ref="inputTitle" v-model="titleWords" placeholder="Ваше название словаря..." type="text" />
          <button class="profile__run modal__btn-image" @click="modalClose">
            <span>{{ t("account.modalWords.close") }}</span>
            <img src="@/assets/cancel.png" alt="" />
          </button>
        </div>
        <button class="make-words__button-speech profile__run" v-if="!isRecording" @click="startRecording">Записать слово через диктофон</button>
        <button class="make-words__button-speech profile__run" v-else @click="stopRecording">Остановить запись</button>
        <div class="make-words__areas">
          <textarea v-if="fieldWords.ru.length > 0" :value="fieldWords.ru"></textarea>
          <textarea v-if="fieldWords.en.length > 0" :value="fieldWords.en"></textarea>
        </div>
        <div class="">
          <div v-for="(num, index) of wordsList.value.length + 1" :key="index" class="modal__item">
            <input-words :word-index="index" @setValueInput="setValueInput" :len="wordsList.value.length" />
          </div>
        </div>
        <div v-if="incorrectWord != null" class="modal__errors-wrapper">
          <div class="modal__errors">
            <p class="modal__message">{{ t("account.modalWords.incorrect") }}</p>
            <p v-if="incorrectWord.correct != undefined">
              {{ t("account.modalWords.correct") }} <span>{{ incorrectWord.correct }}</span>
            </p>
          </div>
        </div>
        <div ref="footer" class="make-words__footer">
          <button type="submit" ref="sendButton" class="profile__run modal-button__run modal__save modal__btn-image" @click="sendData">
            {{ t("account.modalWords.save") }}
          </button>
          <button ref="resetButton" type="submit" class="profile__run modal__save modal__btn-image" @click="resetData">
            <span>{{ t("account.modalWords.clean") }}</span>
            <img src="@/assets/delete.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { useStore } from "vuex"
  import InputWords from "./InputWords.vue"
  import { computed, defineComponent, provide, reactive, ref } from "vue"
  import { useRouter } from "vue-router"
  import { useI18n } from "vue-i18n"
  import { uniqueTitle } from "@/utils/uniqueTitle"
  import Recognizer from "@/utils/Recognizer"
  import "./scss/AccountMakingWords.scss"

  export default defineComponent({
    name: "AccountMakingWords",
    components: { InputWords },
    setup() {
      const store = useStore()
      const router = useRouter()
      const modalContent: any = ref(null)
      const modalWordsWrap: any = ref(null)
      const sendButton: any = ref(null)
      const resetButton: any = ref(null)

      const userID = computed(() => store.getters.userID)
      const recognizer = new Recognizer(window)
      const isRecording = ref<boolean>(recognizer.isRecognizing)
      const txtInterim = ref<string>("")
      const fieldWords = computed(() => store.getters.fieldWords)

      const { t } = useI18n()
      provide("Ti18N", t)

      const incorrectWord = computed(() => store.getters.incorrectWord)
      const startWords = computed(() => store.getters.startModalWords)

      const wordsList: any = reactive({ value: [] })
      let editData: any = reactive({ currentTime: "", english: "", russian: "", id: "" })

      const titleWords = ref("")
      const modalTitle: any = ref(null)
      const inputTitle: any = ref(null)

      const resetData = () => {
        wordsList.value = []
        titleWords.value = ""
        editData = null
        store.commit("SET_IMAGE_WORDS_TO_LIST", { en: "", ru: "" })
        store.commit("CHECK_CORRECT_WORD", null)
      }

      const modalClose = () => router.push(`/account/${userID.value}/close`)

      const sendData = async () => {
        if (wordsList.value.length == 0) {
          modalTitle.value.innerHTML = "Вы не заполнили словарь!"
          modalTitle.value.style.color = "red"
        } else {
          if (startWords.value.title != null) titleWords.value = startWords.value.title
          if (titleWords.value.length == 0) {
            inputTitle.value.placeholder = "Вы не ввели название !"
            inputTitle.value.classList.add("modal__header-error")
          } else {
            await store.dispatch("checkTitles", titleWords.value)
            if (store.getters.isRepeatingTitle) {
              do {
                titleWords.value = uniqueTitle(titleWords.value)
                await store.dispatch("checkTitles", titleWords.value)
              } while (store.getters.isRepeatingTitle)
            }

            document.documentElement.style.overflow = "auto"
            sendButton.value.disabled = true
            resetButton.value.disabled = true

            await store.dispatch("createList", { list: wordsList.value, titleWords: titleWords.value })

            sendButton.value.disabled = false
            resetButton.value.disabled = false
            resetData()

            store.commit("SET_MODAL_WORDS", { list: null, title: null })
            store.commit("SET_PUSHING_WORD", false)
          }
        }
      }

      const getWordID = () => {
        let text = ""
        const words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (let i = 0; i < 16; i++) {
          text += words.charAt(Math.floor(Math.random() * words.length))
        }
        return text
      }

      const checkValidID = (id: any) => {
        let isValid = true
        wordsList.value.forEach((item: any) => {
          if (item.id == id) isValid = false
        })
        return isValid
      }

      const setValueInput = async (data: any) => {
        editData = data.word
        let isValid = false
        let id = ""

        while (!isValid) {
          id = getWordID()
          isValid = checkValidID(id)
        }

        editData.id = id
        await store.dispatch("checkCorrectWord", { wordData: editData })
        if (incorrectWord.value == null) {
          store.commit("SET_TRANSLATION_WORD", { en: "", ru: "" })
          wordsList.value[data.index] = editData
          editData = null
          // nextTick(() => (modalContent.value.style.marginBottom = `${20 * wordsList.value.length}px`))
          // nextTick(() => (document.documentElement.style.marginBottom = `${20 * wordsList.value.length}px`))
          // nextTick(() => (document.documentElement.style.marginBottom = `${20 * wordsList.value.length}px`))
        }
      }

      const showText = (text: string) => txtInterim.value = text

      const startRecording = async () => {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true })
          recognizer.start(showText)
          isRecording.value = recognizer.isRecognizing
        } catch (error: any) {
          console.log("error")
        }
      }
      const stopRecording = () => {
        recognizer.stop()
        isRecording.value = recognizer.isRecognizing
        if (txtInterim.value.trim().length != 0) {
          store.dispatch("translateWord", txtInterim.value)
        }
      }

      return {
        wordsList, titleWords, editData, setValueInput,
        getWordID, checkValidID, resetData, modalClose,
        sendData, incorrectWord, modalTitle, inputTitle, t, userID, startRecording, stopRecording,
        startWords, modalWordsWrap, modalContent, sendButton, resetButton, isRecording, fieldWords
      }
    },
  })
</script>