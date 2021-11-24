<template>
  <div ref="modalWordsWrap" class="modal__wrapper">
    <div ref="modalContent" class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h2 v-if="startWords.title == null" ref="modalTitle">Создать список слов</h2>
          <h2 v-else ref="modalTitle">Добавить новые слова</h2>
          <input v-if="startWords.title == null" ref="inputTitle" v-model="titleWords" placeholder="Ваше название словаря..." type="text" />
          <button class="profile__run modal__btn-image" @click="modalClose">
            <span>Закрыть</span>
            <img src="@/assets/cancel.png" alt="" />
          </button>
        </div>
        <div class="modal__form">
          <div v-for="(num, index) of wordsList.value.length + 1" :key="index" class="modal__item">
            <input-words :word-index="index" @setValueInput="setValueInput" />
          </div>
        </div>
        <div v-if="incorrectWord != null" class="modal__errors-wrapper">
          <div class="modal__errors">
            <p class="modal__message">Данное слово введено неправильно!</p>
            <p v-if="incorrectWord.correct != undefined">
              Возможно вы имели ввиду: <span>{{ incorrectWord.correct }}</span>
            </p>
          </div>
        </div>
        <div ref="footer" class="modal__footer">
          <button type="submit" ref="sendButton" class="profile__run modal-button__run modal__save modal__btn-image" @click="sendData">
            Сохранить
          </button>
          <button ref="resetButton" type="submit" class="profile__run modal__save modal__btn-image" @click="resetData">
            <span>Очистить</span>
            <img src="@/assets/delete.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
  import { useStore } from "vuex"
  import "./scss/ModalWords.scss"
  import InputWords from "@/components/account/InputWords.vue"
  import { computed, defineComponent, nextTick, onMounted, onUnmounted, reactive, ref } from "vue"
  import { useRouter } from "vue-router"

  export default defineComponent({
    name: "ModalWords",
    components: { InputWords },
    setup() {
      const store = useStore()
      const router = useRouter()
      const modalContent: any = ref(null)
      const modalWordsWrap: any = ref(null)
      const sendButton: any = ref(null)
      const resetButton: any = ref(null)

      onMounted(() => {
        nextTick(() => {
          window.scrollTo({ top: 0 })
          document.documentElement.style.overflow = "hidden"
          document.body.classList.add("popup__open")
        })
      })

      onUnmounted(() => (document.body.classList.remove("popup__open")))

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
        store.commit("CHECK_CORRECT_WORD", null)
      }

      const modalClose = () => router.push("/account/words/close")

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
            if (startWords.value.title == null) await store.dispatch("checkTitles", titleWords.value)
            if (store.getters.isRepeatingTitle) {
              modalTitle.value.innerHTML = "Такое название уже существует !"
              modalTitle.value.style.color = "red"
            } else {
              document.documentElement.style.overflow = "auto"
              sendButton.value.disabled = true
              resetButton.value.disabled = true

              await store.dispatch("createList", { list: wordsList.value, titleWords: titleWords.value })

              sendButton.value.disabled = false
              resetButton.value.disabled = false
              resetData()

              store.commit("SET_MODAL_WORDS", { list: null, title: null })
              router.push("/account")
            }
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
          wordsList.value[data.index] = editData
          editData = null
          console.log(wordsList.value.length);
          
          // nextTick(() => (modalContent.value.style.marginBottom = `${20 * wordsList.value.length}px`))
          // nextTick(() => (document.documentElement.style.marginBottom = `${20 * wordsList.value.length}px`))
          // nextTick(() => (document.documentElement.style.marginBottom = `${20 * wordsList.value.length}px`))
        }
      }

      return {
        wordsList, titleWords, editData, setValueInput,
        getWordID, checkValidID, resetData, modalClose,
        sendData, incorrectWord, modalTitle, inputTitle,
        startWords, modalWordsWrap, modalContent, sendButton, resetButton
      }
    },
  })
</script>
