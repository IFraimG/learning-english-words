<template>
  <div class="create-folder__wrapper">
    <div class="create-folder">
      <div class="create-folder__btns">
        <button data-btn="create" v-if="!isInput.value" class="profile__run create-folder-active" @click="editInput(true)">
          Создать раздел
        </button>
        <button data-btn="cancel" class="profile__run" v-else @click="editInput(false)">
          Отмена
        </button>
      </div>
      <input v-if="isInput.value" @keyup.enter="create" type="text" ref="titleFolder" placeholder="Название раздела...">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

export default defineComponent({
  name: "CreateFolder",
  setup() {
    const store = useStore()
    const router = useRouter()
    let titleFolder: any = ref(null)
    let isInput = reactive({value: false})

    const create = async () => {
      await store.dispatch("createFolder", titleFolder.value.value)
      router.push({name: "FolderPage", params: { id: store.getters.folderAfterCreate }})
    }
    const editInput = (isTrue: boolean) => isInput.value = isTrue

    return { titleFolder, create, isInput, editInput }
  }
})
</script>

<style lang="scss" scoped>
.create-folder {
  &__wrapper {
    width: 100%;
  }
  &__btns {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    button:last-child {
      margin-left: 20px;
    }
  }
  input {
    width: 100%;
    height: 30px;
    padding-left: 5px;
    &:focus {
      outline: none;
    }
  }
  &-active {
    gap: 0 20px;
    width: 100%;
    height: 50px;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

button[data-btn='create'] {
  &::after {
    content: url("../../assets/plus.png");
    width: 32px;
    height: 32px;
  }
}

button[data-btn='cancel'] {
  font-size: 16px;
  &::after {
    content: url("../../assets/close.png");
    padding: 10px;
  }
}
</style>