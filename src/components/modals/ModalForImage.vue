<template>
  <Modal v-if="isImage" @onsuccess="null">
    <template #title>
      <p>Изображение</p>
    </template>
    <template #content>
      <div style="display: flex; justify-content: center">
        <img style="object-fit: cover; max-width: 100%; max-height: 400px" :src="url" alt="image">
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, watchEffect } from "vue"
  import Modal from "./Modal.vue"
  import { useRoute } from "vue-router"

  export default defineComponent({
    name: "ModalDeleteWords",
    components: { Modal },
    setup() {
      const route = useRoute()

      onMounted(() => {
        document.documentElement.style.overflow = "hidden"
      })
      const isImage = ref<boolean>(false)
      const url = ref<any>(null)

      watchEffect(() => {
        isImage.value = route.query?.img != null
        url.value = route.query.img
      })

      return { isImage, url }
    }
  })
</script>
