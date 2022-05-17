<template>
  <div class="english-form__result">
    <p v-if="isDone && !isError" class="english-form__success english-form__status">
      Молодец! Все верно!
    </p>
    <div v-if="isError" class="english-form__danger">
      <p class="english-form__danger english-form__status">
        Ответ неверный! Возможно перевод этого слова раннее был введен неккоректно.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "@vue/runtime-core"

  export default defineComponent({
    name: "CorrectAnswer",
    props: {
      isDone: Boolean,
      isError: Boolean
    }
  })
</script>
