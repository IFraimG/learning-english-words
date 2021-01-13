<template>
  <div class="modal__fields">
    <div class="modal__left">
      <input
        class="modal__input"
        @input="$emit('update:english', $event.target.value)"
        type="text"
        placeholder="Слово на английском"
      />
      <input
        class="modal__input"
        @input="$emit('update:russian', $event.target.value)"
        type="text"
        placeholder="Перевод слова на русском"
      />
    </div>
    <div class="modal__right">
      <button v-if="!isDone" class="profile__run modal-button__run" @click="setNumInput">Добавить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputWords",
  data() {
    return {
      isDone: false
    }
  },
  methods: {
    setNumInput() {
      this.$emit('setNumInput')
      this.isDone = true
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
    flex-wrap: wrap;
    gap: 30px;
  }
  &__btn {
    margin-left: 20px;
  }
}
</style>