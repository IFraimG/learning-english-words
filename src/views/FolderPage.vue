<template>
  <div class="folder-page__wrapper" v-if="!isLoader">
    <div class="folder-page">
      <div class="folder-page__header">
        <h1>{{ folderItem.title }}</h1>
        <button>Добавить модуль</button>
      </div>
      <div class="folder-page__content">
        <div v-if="folderItem?.listModules != null"></div>
        <div v-else>
          <h2>Вы сюда ничего не добавили</h2>
        </div>
      </div>
    </div>
  </div>
  <Loader v-else />
</template>

<script lang="ts">
import Loader from "@/components/app/Loader.vue";
import { computed, defineComponent, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: { Loader },
  name: "FolderPage",
  setup() {
    const store = useStore()
    const route = useRoute()
    const folderItem = computed(() => store.getters.folder)
    const isLoader = computed(() => store.getters.isLoaderItem)

    onBeforeMount(() => store.dispatch("getFolder", route.params.id))
    return { folderItem, isLoader }
  }
})
</script>
