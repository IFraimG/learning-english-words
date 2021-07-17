<template>
  <div class="create-folder__wrapper">
    <div class="create-folder">
      <div class="create-folder__btns">
        <button data-btn="create" v-if="!isInput.value" class="profile__run create-folder-active" @click="editInput(true)">
          Создать раздел
        </button>
        <button data-btn="cancel" class="profile__run create-folder-cancel" v-else @click="editInput(false)">
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
  &-cancel {
    padding: 10px 40px;
    font-size: 18px;
  }
}

button[data-btn='create'] {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    right: 80px;
    top: 25px;
    height: 1px;
    width: 20px;
    background-color: #fff;
  }
  &::before {
    content: "";
    position: absolute;
    right: 80px;
    top: 25px;
    height: 1px;
    width: 20px;
    background-color: #fff;
    transform: rotate(90deg);
  }
}

button[data-btn='cancel'] {
  position: relative;
  &::after {
    content: "";
    height: 1px;
    width: 20px;
    position: absolute;
    right: 10px;
    top: 20px;
    background-color: #fff;
  }
}
</style>