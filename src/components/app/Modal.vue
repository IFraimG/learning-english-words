<template>
  <div @click="closeModal" class="modal__wrapper popup__wrapper">
    <div @click.stop class="modal popup">
      <div class="modal__content popup__content">
        <div class="popup__header">
          <p>{{ title }}</p>
          <img @click="closeModal" class="popup__close" src="@/assets/close.png" alt="">
        </div>
        <div class="popup__info">
          <h2>{{ text }}</h2>
        </div>
        <div class="popup__footer">
          <button class="profile__run" @click="$emit('onsuccess', true)">{{ acceptButton }}</button>
          <button
            class="profile__run modal-button__run" 
            @click="$emit('onsuccess', false); closeModal()"
          >Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../account/scss/ModalWords.scss";

export default {
  name: "Popup",
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false,
      default: "Выполните действие"
    },
    acceptButton: {
      type: String,
      required: true
    },
    commitTitle: {
      type: String,
      required: true
    }
  },
  mounted() {
    window.scrollTo({ top: 0 })
    document.documentElement.style.overflow = "hidden"
  },
  methods: {
    closeModal() {
      document.documentElement.style.overflow = "visible"
      this.$store.commit(this.commitTitle, false)
    }
  }
}
</script>

<style lang="scss">
.popup {
  max-width: 800px;
  min-height: 150px;
  &__content {
    padding: 20px;
    position: relative;
  }
  &__wrapper {
    background: rgba(0, 0, 0, 0.5);
    font-family: 'Montserrat', "Helvetica";
  }
  &__header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  &__close {
    min-width: 16px;
    min-height: 16px;
    max-width: 16px;
    max-height: 16px;
    cursor: pointer;
  }
  &__info {
    text-align: center;
    margin-bottom: 20px;
    h2 {
      @media (max-width: 370px) {
        font-size: 24px;
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
}
</style>