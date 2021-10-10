<template>
  <div v-if="!isLoader" class="folder__wrapper">
    <div class="folder-page">
      <div class="folder-page__header">
        <div class="folder-page__header-left">
          <router-link to="/folders">
            <p class="folder-page__link">Разделы</p>
          </router-link>
          <span>/</span>
          <p class="folder-page__link-title">{{ folderItem.title }}</p>
        </div>
        <router-link :to="'/folders/' + $route.params.id + '/delete?title=' + folderItem.title">
          <p class="folder-page__header-delete">Удалить</p>
        </router-link>
      </div>
      <div class="folder-page__content">
        <div v-if="folderItem?.listModules != null && folderItem?.listModules.length > 0" class="folder-list">
          <div v-for="(item, index) of folderItem.listModules" :key="index" class="folder-list__item-wrapper" @contextmenu.prevent>
            <div class="folder__show-menu folder-list__item">
              <div class="folder__show-btns">
                <button @click="redirectWords(item.title)">Изучить</button>
                <button @click="deleteList(item.title)">Удалить из списка</button>
              </div>
            </div>
            <div class="folder-list__item folder-list__noshow">
              <div class="list__title folder-list__title">
                <h3>{{ item.title }}</h3>
              </div>
              <div v-for="(words, index) of item.words" :key="index" class="list__words folder-list__item">
                <p class="list__item folder folder-list__text">
                  <span class="list__english">{{ words.english }}</span>
                  -
                  <span class="list__russian">{{ words.russian }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="folder-page-notfound">
          <h2>Вы сюда ничего не добавили</h2>
        </div>
      </div>
    </div>
  </div>
  <router-view v-if="!isLoader"></router-view>
  <Loader v-else />
</template>

<script lang="ts">
  import Loader from "@/components/app/Loader.vue"
  import { computed, defineComponent, onBeforeMount, onMounted, provide } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { useStore } from "vuex"
  import { useI18n } from "vue-i18n"
  import "@/components/folders/scss/FolderPage.scss"

  export default defineComponent({
    name: "FolderPage",
    components: { Loader },
    setup() {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      const folderItem = computed(() => store.getters.folder)
      const isLoader = computed(() => store.getters.isLoaderItem)
      const userID = computed(() => store.getters.userID)
      const currentWords = computed(() => store.getters.currentWords)

      const { t } = useI18n()
      provide("Ti18N", t)

      onBeforeMount(() => store.dispatch("getFolder", route.params.id))
      onMounted(() => store.dispatch("getWords"))

      const redirectWords = (title: string) => {
        const index = currentWords.value.findIndex((words: any) => words.title == title)
        if (index != -1) router.push(`/words/${userID.value}/${index}/?type=start`)
      }

      const deleteList = (title: string) => {
        store.dispatch("deleteWordsFromFolder", { title: title, folder: folderItem.value, key: route.params.id })
      }

      return {
        folderItem, isLoader, redirectWords, deleteList
      }
    },
  })
</script>
