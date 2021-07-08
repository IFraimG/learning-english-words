<template>
  <div v-if="!isLoader">{{ folderItem.title }}</div>
  <Loader v-else />
</template>

<script lang="ts">
import Loader from "@/components/app/Loader.vue";
import { computed, defineComponent, onMounted } from "vue";
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

    onMounted(() => store.dispatch("getFolder", route.params.id))

    return { folderItem, isLoader }
  }
})
</script>
