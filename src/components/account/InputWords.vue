<template>
  <div class="modal__fields">
    <div class="modal__left">
      <input
        class="modal__input"
        :ref="'englishWord' + id"
        @input="
          $emit('update:english', $event.target.value);
          isDone = false;
        "
        type="text"
        pattern="[A-Za-z]"
        placeholder="Слово на английском"
      />
      <input
        class="modal__input"
        @input="
          $emit('update:russian', $event.target.value);
          isDone = false;
        "
        type="text"
        :ref="'russianWord' + id"
        pattern="[А-Яа-яЁё]"
        placeholder="Перевод слова на русском"
      />
      <select-time :timeEdit="null" @setTime="setTime" />
    </div>
    <div class="modal__right">
      <button
        v-if="!isDone"
        class="profile__run modal-button__run modal__btn-image"
        @click="setNumInput"
      >
        <span>Добавить</span>
        <img src="@/assets/plus.png" />
      </button>
    </div>
  </div>
</template>

<script>
import "./scss/InputWords.scss";
import SelectTime from "./SelectTime.vue";

export default {
  components: { SelectTime },
  name: "InputWords",
  props: {
    id: String
  },
  data() {
    return {
      isDone: false,
      isEdit: false
    };
  },
  methods: {
    setNumInput() {
      this.$emit("setNumInput");
      this.isDone = true;
    },
    setTime(time) {
      this.$emit("update:currentTime", time);
    }
  }
};
</script>

<style lang="scss">
.modal {
  &-button__run {
    background-color: #30475e !important;
    &:active {
      background-color: #4a6c8d !important;
    }
  }
}
</style>
