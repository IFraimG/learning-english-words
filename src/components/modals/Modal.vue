<template>
  <div class="modal__wrapper popup__wrapper">
    <div class="modal popup" @click.stop>
      <div class="modal__content popup__content">
        <div class="popup__header">
          <slot name="title"></slot>
          <img class="popup__close" src="@/assets/close.png" alt="close" @click="closeModal" />
        </div>
        <div class="popup__content">
          <slot name="content"></slot>
        </div>
        <div class="popup__footer">
          <button class="profile__run" @click="sendSuccess">
            <slot name="acceptButton">Готово</slot>
          </button>
          <button class="profile__run modal-button__run" @click="closeModal">
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { nextTick, onMounted } from "vue"
  import { useRouter } from "vue-router"
  import "./scss/ModalWords.scss"
  import "./scss/Popup.scss"

  export default {
    name: "Popup",
    emits: ["onsuccess"],
    setup(_, { emit }) {
      const router = useRouter()

      onMounted(() => {
        nextTick(() => {
          window.scrollTo({ top: 0 })
          document.documentElement.style.overflow = "hidden"
        })
      })

      const sendSuccess = isTrue => emit("onsuccess", isTrue)

      document.addEventListener("keydown", event => {
        if (event.key == "Escape") closeModal()
      })

      const closeModal = () => {
        document.documentElement.style.overflow = "auto"
        sendSuccess(false)
        router.go(-1)
      }

      return { sendSuccess, closeModal }
    }
  }
</script>
