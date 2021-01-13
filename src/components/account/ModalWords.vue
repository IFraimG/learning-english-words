<template>
  <div @click="$emit('setModal', false)" v-if="isModal" class="modal__wrapper">
    <transition name="modalWords">
      <div @click.stop v-if="isModal" class="modal">
        <div class="modal__content">
          <div class="modal__header">
            <h2>Создать список слов</h2>
            <button @click="$emit('setModal', false)" class="profile__run">Закрыть</button>
          </div>
          <div class="modal__form">
            <div class="modal__item" v-for="(num, index) of wordsList.length + 1" :key="index">
              <input-words
                :id="editData.id"
                v-model:english="editData.english"
                v-model:russian="editData.russian"
                @setNumInput="setNumInput"
                @delNumInput="delNumInput"
              />
            </div>
          </div>
        </div>
        <div class="modal__footer">
          <button @click="sendData" type="submit" class="profile__run modal-button__run modal__save">Сохранить</button>
          <button type="submit" class="profile__run modal__save" @click="resetData">Очистить</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import InputWords from './InputWords.vue'
export default {
  components: { InputWords },
  name: "ModalWords",
  data() {
    return {
      wordsList: [],
      editData: {
        id: 1,
        english: "",
        russian: ""
      }
    }
  },
  props: {
    isModal: Boolean
  },
  methods: {
    resetData() {
      this.wordsList = []
      this.editData = { id: 1, english: "", russian: "" };
    },
    sendData() {
      this.$store.dispatch("createList", { profile: this.$store.state.auth.profile, list: this.wordsList })
      this.resetData()
      this.$emit('setModal', false)
    },
    setNumInput() {
      let newID = this.editData.id + 1;
      this.editData.id = this.wordsList.length + 1;
      this.wordsList.push(this.editData);
      this.editData = { id: newID, english: "", russian: "" };
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  width: 800px;
  min-height: 600px;
  background-color: #fff;
  border-radius: 20px;
  margin: 20px;
  position: relative;
  &__wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__content {
    max-width: 100%;
    font-family: "Helvetica";
    padding: 20px 0;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding-bottom: 20px;
    h2, button {
      margin: 0 20px;
    }
  }
  &__footer {
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    padding-top: 20px;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    bottom: 20px;
    left: 0;
    button {
      margin: 0 20px;
    }
  }
  &__form {
    margin-bottom: 80px;
  }
  &__item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    &:last-child {
      border-bottom: none;
    }
  }
}

.modalWords-enter-active, .modalWords-leave-active {
  transition: 0.4s;
}

.modalWords-enter-from, .modalWords-leave-to {
  opacity: 0;
}
</style>