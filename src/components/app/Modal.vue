<template>
  <div @click="closeModal" class="modal__wrapper popup__wrapper">
    <div @click.stop class="modal popup">
      <div class="modal__content popup__content">
        <div class="popup__header">
          <slot name="title"></slot>
          <img
            @click="closeModal"
            class="popup__close"
            src="@/assets/close.png"
            alt="close"
          />
        </div>
        <div class="popup__content">
          <slot name="content"></slot>
        </div>
        <div class="popup__footer">
          <button class="profile__run" @click="sendSuccess(true)">
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
import "../account/scss/ModalWords.scss";
import "./scss/Popup.scss";

export default {
  name: "Popup",
  emits: ["onsuccess"],
  mounted() {
    window.scrollTo({ top: 0 });
    document.documentElement.style.overflow = "hidden";
  },
  beforeUnmount() {
    this.closeModal()
  },
  methods: {
    closeModal() {
      document.documentElement.style.overflow = "auto";
      this.sendSuccess(false)
    },
    sendSuccess(isTrue) {
      this.$emit('onsuccess', isTrue)
    }
  }
};
</script>