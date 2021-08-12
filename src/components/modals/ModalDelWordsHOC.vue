<template>
  <ModalDeleteWords @succeed="deleteWords" :title="title.value" />
</template>

<script lang="ts">
// NOT WORKING !!!!!
import { computed, defineComponent, readonly } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ModalDeleteWords from './ModalDeleteWords.vue'

export default defineComponent({
  name: "ModalDeleteWords",
  components: { ModalDeleteWords },
  setup() {
    const store = useStore()
    const route = useRoute()

    const currentWords = computed(() => store.getters.currentWords)
    let title = readonly({ value: route.query.title })

    const deleteWords = async () => {
      let index = currentWords.value.findIndex((wordList: any) => title.value == wordList.title);
      if (index != -1) await store.dispatch("deleteWords", { title: title.value, index,  wordsFull: currentWords.value });
      history.back()
    }

    return { deleteWords, currentWords, title }
  }
})
</script>