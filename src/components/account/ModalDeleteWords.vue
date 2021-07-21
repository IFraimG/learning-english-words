<template>
  <Modal @onsuccess="deleteWords">
    <template #title>
      <p>Удаление {{ title.value }}</p>
    </template>
    <template #content>
      <h2>Вы уверены, что хотите его удалить?</h2>
    </template>
    <template #acceptButton>Удалить</template>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, readonly } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Modal from '../app/Modal.vue'

export default defineComponent({
  name: "ModalDeleteWords",
  components: { Modal },
  setup() {
    const store = useStore()
    const route = useRoute()

    const currentWords = computed(() => store.getters.currentWords)
    let title = readonly({ value: route.query.title })

    const deleteWords = async (isTrue: boolean) => {
      if (isTrue) {
        document.documentElement.style.overflow = "auto";
        let index = currentWords.value.findIndex((wordList: any) => title.value == wordList.title);
        if (index != -1) await store.dispatch("deleteWords", { title: title.value, index,  wordsFull: currentWords.value });
        history.back()
      }
    }

    return { deleteWords, currentWords, title }
  }
})
</script>