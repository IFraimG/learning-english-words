<template>
  <div class="modal__fields">
    <div class="modal__left">
      <input
        class="modal__input"
        @input="$emit('update:english', $event.target.value); isDone = false"
        type="text"
        pattern="[A-Za-z]"
        placeholder="Слово на английском"
      />
      <input
        class="modal__input"
        @input="$emit('update:russian', $event.target.value); isDone = false"
        type="text"
        pattern="[А-Яа-яЁё]"
        placeholder="Перевод слова на русском"
      />
      <select v-model="time" @change="setTime" class="modal__select">
        <option :value="-1" selected>Время (none)</option>
        <option v-for="(time, index) of timesArray" :key="index" :value="index">{{ time }}</option>
      </select>
    </div>
    <div class="modal__right">
      <button v-if="!isDone" class="profile__run modal-button__run modal__btn-image" @click="setNumInput">
        <span>Добавить</span>
        <img src="@/assets/plus.png" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputWords",
  data() {
    return {
      isDone: false,
      isEdit: false,
      time: -1,
      timesArray: [
        "Present Simple", "Present Continious", "Present Perfect",
        "Present Perfect Continious", "Past Simple", "Past Continious",
        "Past Perfect", "Past Perfect Continious", "Future Simple", "Future Perfect"
      ]
    }
  },
  methods: {
    setNumInput() {
      this.$emit('setNumInput')
      this.isDone = true
    },
    setTime() {
      this.$emit('update:currentTime', this.timesArray[this.time]);
    }
  }
};
</script>

<style lang="scss">
.modal {
  &__fields {
    margin: 30px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: space-around;
  }
  &-button__run {
    background-color: #30475e !important;
    &:active {
      background-color: #4a6c8d !important;
    }
  }
  &__input {
    margin: 0 20px;
    width: 200px;
    height: 30px;
    padding: 0 10px;
    &:focus {
      outline: none;
    }
  }
  &__left {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
  }
  &__btn {
    margin-left: 20px;
    &-image {
      display: flex;
      align-items: center;
      span {
        font-weight: bold;
        font-size: 16px;
      }
      img {
        width: 24px;
        height: 24px;
        margin-left: 10px;
        object-fit: contain;
      }
    }
  }
  &__errors {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px 30px;
    background-color: #c73636;
    color: #fff;
    font-size: 16px;
    padding: 10px;
    &-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 80px;
    }
  }
  &__message {
    font-weight: bold;
  }
}
</style>