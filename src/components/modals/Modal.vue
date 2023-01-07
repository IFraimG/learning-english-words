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
            <slot name="acceptButton">{{ t("account.wordsTable.panel.save") }}</slot>
          </button>
          <button class="profile__run modal-button__run" @click="closeModal">
            {{ t("account.createFolder.cancel") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { nextTick, onBeforeUnmount, onMounted, provide } from "vue"
  import { useRouter } from "vue-router"
  import "./scss/ModalWords.scss"
  import "./scss/Popup.scss"
  import { useI18n } from 'vue-i18n'

  export default {
    name: "Popup",
    emits: ["onsuccess"],
    setup(_, { emit }) {
      const router = useRouter()

      const { t } = useI18n()
      provide("Ti18N", t)

      onMounted(() => {
        nextTick(() => {
          window.scrollTo({ top: 0 })
        })
      })

      onBeforeUnmount(() => document.documentElement.style.overflow = "auto")

        // document.addEventListener("keydown", event => {
        //   if (event.key == "Escape") closeModal()
        // })

      const sendSuccess = isTrue => emit("onsuccess", isTrue)

      const closeModal = () => {
        document.documentElement.style.overflow = "auto"
        sendSuccess(false)
        router.go(-1)
      }

      return { sendSuccess, closeModal, t }
    }
  }
</script>
