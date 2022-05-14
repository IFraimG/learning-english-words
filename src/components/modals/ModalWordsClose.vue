<template>
  <Modal @onsuccess="deleteItem">
    <template #title>
      <p>Очистка новых слов</p>
    </template>
    <template #content>
      <h2 class="popup__logout-text">Вы уверены, что хотите выйти? Изменения не сохранятся...</h2>
    </template>
    <template #acceptButton>Выйти</template>
  </Modal>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted } from "vue"
  import Modal from "./Modal.vue"
  import { useRouter } from "vue-router"
  import { useStore } from "vuex"

  export default defineComponent({
    name: "ModalWordsClose",
    components: { Modal },
    emits: ["succeed"],
    setup() {
      const store = useStore()
      const router = useRouter()

      const userID = computed(() => store.getters.userID)

      onMounted(() => nextTick(() => window.scrollTo({ top: 0 })))

      const deleteItem = async (isTrue: boolean) => {
        if (isTrue) {
          store.commit("SET_MODAL_WORDS", { list: null, title: null })
          document.documentElement.style.overflow = "auto"

          await router.push("/account/" + userID.value)
        } else document.documentElement.style.overflow = "hidden"
      }

      return { deleteItem }
    },
  })
</script>
