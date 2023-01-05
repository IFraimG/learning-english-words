<template>
  <Modal @onsuccess="sendImage">
    <template #title>
      <h3>Загрузка внешнего списка слов</h3>
    </template>
    <template #content>
      <div class="modal-scanner">
        <div class="modal-scanner__buttons-panel">
          <input type="file" id="inputFile" hidden @change="loadFile">
          <button сlass="modal-scanner__btn">
            <label сlass="modal-scanner__btn" for="inputFile" style="width: 100%; height: 100%">
              Загрузить файл
            </label>
          </button>
          <button сlass="modal-scanner__btn" @click="cameraOn">Загрузить через веб-камеру</button>
          <button сlass="modal-scanner__btn">Загрузить через снимок экрана телефона</button>
        </div>
        <div class="modal-scanner__content">
          <div class="modal-scanner__result" v-if="fileSrc != null">
            <img :src="fileSrc" />
            <button class="profile__run" @click="deleteImage">Убрать снимок</button>
          </div>
          <video-recorded v-if="isOpenVideo" @setImageURL="setImageURL" />
          <div class="modal-scanner__errors">
            <!-- .... -->
          </div>
        </div>
      </div>
    </template>
    <template #acceptButton>Загрузить</template>
  </Modal>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, readonly, ref } from "vue"
  import Modal from "./Modal.vue"
  import { useRoute } from "vue-router"
  import { useStore } from "vuex"
  import "./scss/ModalScanner.scss"
  import VideoRecorded from "../app/VideoRecorded.vue"

  export default defineComponent({
    name: "ModalScanner",
    components: { Modal, VideoRecorded },
    emits: ["succeed"],
    setup() {
      const store = useStore()
      const route = useRoute()
      const title = readonly({ value: route.query.title })
      const fileSrc = ref<any>(null)
      const isOpenVideo = ref<boolean>(false)

      onMounted(() => nextTick(() => window.scrollTo({ top: 0 })))

      const cameraOn = async () => {
        deleteImage()
        isOpenVideo.value = true
      }
      const sendImage = async (isTrue: boolean) => {

      }

      const setImageURL = (src: any) => {
        fileSrc.value = src
        isOpenVideo.value = false
      }

      const deleteImage = () => fileSrc.value = null

      const loadFile = (event: any) => {
        deleteImage()
        const file = event.target.files["0"]

        if (!file.type.match('image.*')) console.log("Некорректный формат");
        else {
          const reader = new FileReader()
          reader.readAsDataURL(file);
          reader.onload = () => setImageURL(reader.result)
        }
      }

      return { sendImage, title, cameraOn, loadFile, fileSrc, deleteImage, isOpenVideo, setImageURL }
    },
  })
</script>
