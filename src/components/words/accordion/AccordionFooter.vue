<template>
  <div class="accordion__footer">
    <button class="accordion__send profile__run" @click="rotateWords">
      Перевернуть гармошку
    </button>
    <router-link :to="{ name: 'Account', params: { id: userID } }">
      <button class="accordion__send profile__run">
        Завершить
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: "AccordionFooter",
    setup(_: any, { emit }: any) {
      const rotateWords = () => emit("rotateWords")
      const store = useStore()
      const userID = computed(() => store.getters.userID)

      return { rotateWords, userID }
    },
  })
</script>
