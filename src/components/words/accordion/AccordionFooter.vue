<template>
  <div class="accordion__footer">
    <button class="accordion__send profile__run" @click="rotateWords">
      Перевернуть гармошку
    </button>
    <router-link :to="{ name: 'Account' }">
      <button class="accordion__send profile__run">
        Завершить
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: "AccordionFooter",
    setup(_: any, { emit }: any) {
      const rotateWords = () => emit("rotateWords")

      return { rotateWords }
    },
  })
</script>
