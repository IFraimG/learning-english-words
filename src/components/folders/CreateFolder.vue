<template>
  <div class="create-folder__wrapper">
    <div class="create-folder">
      <div class="create-folder__btns">
        <button v-if="!isInput.value" data-btn="create" class="profile__run create-folder-active" @click="editInput(true)">
          Создать раздел
        </button>
        <button v-else data-btn="cancel" class="profile__run create-folder-cancel" @click="editInput(false)">
          Отмена
        </button>
      </div>
      <input v-if="isInput.value" ref="titleFolder" type="text" placeholder="Название раздела..." @keyup.enter="create" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from "vue"
  import { useRouter } from "vue-router"
  import { useStore } from "vuex"
  import "./scss/CreateFolder.scss"

  export default defineComponent({
    name: "CreateFolder",
    setup() {
      const store = useStore()
      const router = useRouter()
      const titleFolder: any = ref(null)
      const isInput = reactive({ value: false })

      const create = async () => {
        await store.dispatch("createFolder", titleFolder.value.value)
        router.push({ name: "FolderPage", params: { id: store.getters.folderAfterCreate } })
      }
      const editInput = (isTrue: boolean) => (isInput.value = isTrue)

      return { titleFolder, create, isInput, editInput }
    },
  })
</script>
