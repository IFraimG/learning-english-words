<template>
  <Modal @onsuccess="deleteItem">
    <template #title>
      <p>{{ Ti18N("account.modalWords.clearWords") }}</p>
    </template>
    <template #content>
      <h2 class="popup__logout-text">{{ Ti18N("account.modalWords.warning") }}</h2>
    </template>
    <template #acceptButton>{{ Ti18N("logout") }}</template>
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
    inject: ["Ti18N"],
    emits: ["succeed"],
    setup() {
      const store = useStore()
      const router = useRouter()

      const userID = computed(() => store.getters.userID)

      onMounted(() => {
        nextTick(() => {
          window.scrollTo({ top: 0 })
          document.documentElement.style.overflow = "hidden"
        })
      })

      const deleteItem = async (isTrue: boolean) => {
        if (isTrue) {
          store.commit("SET_MODAL_WORDS", { list: null, title: null })
          store.commit("SET_TRANSLATION_WORD", { en: "", title: "" })
          store.commit("SET_PUSHING_WORD", false)
          document.documentElement.style.overflow = "auto"
          await router.push("/account/" + userID.value)
        } else document.documentElement.style.overflow = "hidden"
      }

      return { deleteItem }
    },
  })
</script>
