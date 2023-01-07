<template>
  <Modal @onsuccess="deleteItem">
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
  import { computed, defineComponent, nextTick, onMounted, readonly, ref } from "vue"
  import Modal from "./Modal.vue"
  import { useRoute } from "vue-router"
  import { useStore } from "vuex"

  export default defineComponent({
    name: "ModalDeleteWords",
    components: { Modal },
    emits: ["succeed"],
    setup() {
      const store = useStore()
      const route = useRoute()
      const isLoading = ref(false)

      onMounted(() => {
        nextTick(() => {
          window.scrollTo({ top: 0 })
          document.documentElement.style.overflow = "hidden"
        })
      })
      const currentWords = computed(() => store.getters.currentWords)
      const title = readonly({ value: route.query.title })

      const deleteItem = async (isTrue: boolean) => {
        if (isTrue && !isLoading.value) {
          isLoading.value = true

          const index = currentWords.value.findIndex((wordList: any) => title.value == wordList.title)
          if (index != -1) await store.dispatch("deleteWords", { title: title.value, index, wordsFull: currentWords.value })

          isLoading.value = false
          document.documentElement.style.overflow = "auto"
          history.back()
        }
      }

      return { deleteItem, title }
    },
  })
</script>
