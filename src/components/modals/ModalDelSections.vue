<template>
  <Modal @onsuccess="deleteItem">
    <template #title>
      <p>Удаление раздела {{ title.value }}</p>
    </template>
    <template #content>
      <h2>Вы уверены, что хотите это удалить?</h2>
    </template>
    <template #acceptButton>Удалить</template>
  </Modal>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, readonly } from 'vue'
  import Modal from './Modal.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: "ModalDeleteWords",
    components: { Modal },
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()

      onMounted(() => nextTick(() => window.scrollTo({ top: 0 })))
    
      let title = readonly({ value: route.query.title })

      const deleteItem = async (isTrue: boolean) => {
        if (isTrue) {
          document.documentElement.style.overflow = "auto";
          await store.dispatch("deleteFolder", { key: route.params.id });
          router.push("/folders")
        }
      }

      return { deleteItem, title }
    }
  })
</script>