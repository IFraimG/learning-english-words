<template>
  <div v-if="!isLoader" class="folders__wrapper">
    <div class="folders">
      <h1>{{ t("folders.fullList") }}</h1>
      <div v-if="shortFolders.length > 0" class="folders__content">
        <div v-for="(item, index) in shortFolders" :key="index" class="folders__item-wrapper">
          <router-link :to="{ name: 'FolderPage', params: { id: item.key } }">
            <div class="folders__item">
              <h2>{{ item.title }}</h2>
              <div v-if="item.listModules != null">
                <div v-for="title of item.listModules" :key="title" class="folders__title">
                  <p>{{ title }}</p>
                </div>
              </div>
              <div v-else class="folders__list-nowords">
                <p>{{ t("folders.noAdded") }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="folders__create">
        <CreateFolder />
      </div>
    </div>
  </div>
  <Loader v-else />
</template>

<script lang="ts">
  import Loader from "@/components/app/Loader.vue"
  import { computed, defineComponent, onMounted, provide } from "vue"
  import { useStore } from "vuex"
  import { useI18n } from "vue-i18n"
  import "@/components/account/scss/Account.scss"
  import "@/components/folders/scss/Folders.scss"
  import CreateFolder from "@/components/folders/CreateFolder.vue"

  export default defineComponent({
    name: "Folders",
    components: { Loader, CreateFolder },
    setup() {
      const store = useStore()
      const { t } = useI18n()
      provide("Ti18N", t)

      const shortFolders = computed(() => store.getters.shortFolders)
      const isLoader = computed(() => store.getters.isLoaderItem)

      onMounted(() => store.dispatch("getFoldersList"))

      return { isLoader, shortFolders, t }
    },
  })
</script>
