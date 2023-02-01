<template>
  <Modal @onsuccess="saveWords">
    <template #title>
      <p class="modal-scanner__title">{{ Ti18N('scanner.loadInnerList') }}</p>
      <div class="modal-scanner__buttons-panel">
        <input type="file" id="inputFile" hidden @change="loadFile" ref="file1" />
        <button сlass="modal-scanner__btn">
          <label v-if="listWords.ru.length > 0 !== listWords.en.length > 0" сlass="modal-scanner__btn" for="inputFile" style="width: 100%; height: 100%">{{  Ti18N('scanner.loadSecondFile') }}</label>
          <label v-else сlass="modal-scanner__btn" for="inputFile" style="width: 100%; height: 100%">{{ Ti18N('scanner.loadFile') }}</label>
        </button>
        <button v-if="!isMobilePhone" сlass="modal-scanner__btn" @click="cameraOn">{{ Ti18N('scanner.loadWithWeb') }}</button>
        <input type="file" accept="image/*" id="inputCameraFile" capture hidden @change="loadFile" />
        <button v-if="isMobilePhone" сlass="modal-scanner__btn">
          <label for="inputCameraFile">{{ Ti18N('scanner.loadWithCamera') }}</label>
        </button>
      </div>
    </template>
    <template #content>
      <div class="modal-scanner">
        <div class="modal-scanner__content">
          <div class="modal-scanner__content-main">
            <div class="modal-scanner__result">
              <img class="modal-scanner__img" :src="fileSrc" v-if="!isEdit && fileSrc != null" />
              <Cropper v-if="isEdit" @keyup.enter="editImage" class="modal-scanner__img" ref="cropperElement" :src="fileSrc" @change="changeCrooperElement" />
              <div class="modal-scanner__right">
                <div v-if="fileSrc != null" class="modal-scanner__buttons-actions">
                  <button v-if="isEdit" class="profile__run" @click="editImage">{{ Ti18N('scanner.ready') }}</button>
                  <button class="profile__run" @click="deleteImage">{{ Ti18N('scanner.removeImg') }}</button>
                  <button v-if="!isEdit" class="profile__run" @click="sendImage('eng')">{{ Ti18N('scanner.en') }}</button>
                  <button v-if="!isEdit" class="profile__run" @click="sendImage('rus')">{{ Ti18N('scanner.rus') }}</button>
                </div>
                <div class="modal-scanner__fields">
                  <progress :value="progress" max="1" v-if="progress < 1"></progress>
                  <div v-if="listWords.ru.length > 0" class="modal-scanner__fields-ru">
                    <p>{{ Ti18N('scanner.ruSymbols') }}</p>
                    <textarea v-model="listWords.ru"></textarea>
                  </div>
                  <div v-if="listWords.en.length > 0" class="modal-scanner__fields-en">
                    <p>{{ Ti18N('scanner.enSymbols') }}</p>
                    <textarea v-model="listWords.en"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <video-recorded v-if="isOpenVideo && errorsList.length == 0" :isOpenVideo="isOpenVideo" @setImageURL="setImageURL" @setErrors="setErrors" />
          </div>
          <div class="modal-scanner__errors">
            <p v-for="error of errorsList" :key="error.msg">{{ error.msg }}</p>
          </div>
        </div>
      </div>
    </template>
    <template #acceptButton>{{ Ti18N('account.wordsTable.panel.save') }}</template>
  </Modal>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, readonly, ref } from "vue"
  import Modal from "./Modal.vue"
  import { useRoute, useRouter } from "vue-router"
  import { useStore } from "vuex"
  import "./scss/ModalScanner.scss"
  import VideoRecorded from "../app/VideoRecorded.vue"
  import Tesseract from "tesseract.js"
  import { Cropper } from "vue-advanced-cropper"
  import "vue-advanced-cropper/dist/style.css"
  export default defineComponent({
    name: "ModalScanner",
    components: { Modal, VideoRecorded, Cropper },
    emits: ["succeed"],
    inject: ["Ti18N"],
    setup() {
      const arr_en = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
      const arr_EN = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
      const arr_ru = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ь", "ы", "ъ", "э", "ю", "я"]
      const arr_RU = ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ь", "Ы", "Ъ", "Э", "Ю", "Я"]
      const arr_num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
      const arr_symb = ["!", "@", "#", "$", "%", "&", "?", "-", "+", "=", "~"]
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const title = readonly({ value: route.query.title })
      const fileSrc = ref<any>(null)
      const isOpenVideo = ref<boolean>(false)
      const isMobilePhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
      const errorsList = ref<{ msg: string }[]>([])
      const listWords = reactive<{ en: string; ru: string }>({ ru: "", en: "" })
      const isEdit = ref<boolean>(false)
      const cropperElement = ref<any>(null)
      const editInfoImage = reactive<any>({})
      const progress = ref<number>(1)
      const file1 = ref<any>(null)
      onMounted(() => document.documentElement.style.overflowY = "auto")
      
      const cameraOn = async () => {
        deleteImage()
        isOpenVideo.value = true
      }
      const sendImage = async (lang: string) => {
        errorsList.value = []
        const data: any = await Tesseract.recognize(fileSrc.value, lang, { logger: (message: any) => progress.value = message.progress })
        if (data.data.text == undefined) setErrors("Слова не были обнаружены")
        else {
          const result = data.data.text
          let arr: any = result.split("\n")
          arr.map((word: string, index: number) => {
            let newStr = ""
            for (let i = 0; i < word.length; i++) {
              if (arr_symb.includes(word[i]) || arr_num.includes(word[i])) newStr += word[i]
              else if (lang == "eng") {
                if (arr_EN.includes(word[i]) || arr_en.includes(word[i])) newStr += word[i]
              } else if (lang == "rus") {
                if (arr_RU.includes(word[i]) || arr_ru.includes(word[i])) newStr += word[i]
              }
            }
            if (newStr.length == 0) arr.splice(index, 1)
            else arr[index] = newStr
          })
          if (lang == "eng") listWords.en = Array.from(result).join("")
          else if (lang == "rus") listWords.ru = Array.from(result).join("")
        }
      }
      const setImageURL = (src: any) => {
        fileSrc.value = src
        isEdit.value = true
        isOpenVideo.value = false
      }
      const setErrors = (msg: string) => errorsList.value.push({ msg })
      const deleteImage = () => {
        errorsList.value = []
        // fileSrc.value = null
      }
      const saveWords = () => {
        if (listWords.en.length == 0 && listWords.ru.length == 0) return
        store.commit("SET_IMAGE_WORDS_TO_LIST", listWords)
        deleteImage()
        listWords.en = ""
        listWords.ru = ""
        store.commit("SET_PUSHING_WORD", true)
        router.push("/")
      }
      const loadFile = (event: any) => {
        isOpenVideo.value = false
        deleteImage()
        const file = event.target.files["0"]
        if (!file.type.match("image.*")) setErrors("Некорректный формат")
        else {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            setImageURL(reader.result)
            file1.value.value = null
          }
        }
      }
      const editImage = () => {
        isEdit.value = false
        fileSrc.value = cropperElement.value.getResult().canvas.toDataURL()
        editInfoImage.value = {}
      }
      const changeCrooperElement = (infoImage: any) => (editInfoImage.value = infoImage)
      return {
        sendImage,
        title,
        cameraOn,
        loadFile,
        fileSrc,
        deleteImage,
        isOpenVideo,
        setImageURL,
        isMobilePhone,
        errorsList,
        setErrors,
        saveWords,
        cropperElement,
        changeCrooperElement,
        editImage,
        isEdit,
        listWords,
        progress,
        file1
      }
    },
  })
</script>