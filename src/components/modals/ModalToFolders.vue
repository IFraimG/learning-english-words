<template>
  <Modal @onsuccess="sendSection">
    <template #title>
      <p>Добавление слов</p>
    </template>
    <template #content>
      <div v-if="!isLoaderItem">
        <DropList @setItem="saveSection" v-if="foldersList != null" :list="foldersList" />
        <div class="profile__nosections" v-else>
          <p>Вы еще не создали ни один раздел, или ваши слова уже есть во всех ваших разделах</p>
          <CreateFolder class="profile__nosections-create" />
        </div>
      </div>
      <Loader v-else />
    </template>
    <template #acceptButton>Добавить</template>
  </Modal>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, reactive, readonly } from "vue"
  import { useRoute } from "vue-router"
  import { useStore } from "vuex"
  import Modal from "./Modal.vue";
  import DropList from '@/components/app/DropList.vue';
  import CreateFolder from '@/components/folders/CreateFolder.vue';
  import Loader from '@/components/app/Loader.vue';

  export default defineComponent({
    name: "ModalToFolders",
    components: { Modal, DropList, CreateFolder, Loader },
    setup() {
      const store = useStore()
      const route = useRoute()

      const title = readonly({ value: route.query.title })
      let section = reactive({ value: null })
      let shortFolders = computed(() => store.getters.shortFolders)
      let isLoaderItem = computed(() => store.getters.isLoaderItem)

      onMounted(() => {
        nextTick(() => window.scrollTo({ top: 0 }))
        store.dispatch("getFoldersList")
      })

      const foldersList = computed(() => {
        if (shortFolders.value == null) return null
        return shortFolders.value.filter((folder: any) => !folder.listModules.includes(title.value))
      })

      const saveSection = (item: any) => section.value = item

      const sendSection = (isTrue: boolean) => {
        if (!isTrue) section.value = null
        if (isTrue && section.value != null) {
          store.dispatch("addWordsToSection", {section: section.value, title: title.value})
          document.documentElement.style.overflow = "auto";
          history.back()
        }
      }

      return {
        sendSection, saveSection,
        section, shortFolders, isLoaderItem,
        foldersList
      }
    }
  })
</script>
