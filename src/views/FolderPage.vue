<template>
  <div class="folder__wrapper" v-if="!isLoader">
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
        <di class="folder-list" v-if="folderItem?.listModules != null">
          <div 
            class="folder-list__item-wrapper"
            v-for="(item, index) of folderItem.listModules"
            :key="index"
            @click="redirectWords(item.title)">
            <div class="folder-list__item" >
              <div class="list__title folder-list__title">
                <h3>{{ item.title }}</h3>
              </div>
              <div
                class="list__words folder-list__item"
                v-for="(words, index) of item.words"
                :key="index"
              >
                <p class="list__item folder folder-list__text">
                  <span class="list__english">{{ words.english }}</span>
                  -
                  <span class="list__russian">{{ words.russian }}</span>
                </p>
              </div>
            </div>
          </div>
        </di>
        <div v-else>
          <h2>Вы сюда ничего не добавили</h2>
        </div>
      </div>
    </div>
  </div>
  <router-view v-if="!isLoader"></router-view>
  <Loader v-else />
</template>

<script lang="ts">
  import Loader from "@/components/app/Loader.vue";
  import { computed, defineComponent, onBeforeMount, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStore } from "vuex";
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

      onBeforeMount(() => store.dispatch("getFolder", route.params.id))
      onMounted(() => store.dispatch("getWords"))

      const redirectWords = (title: string) => {
        const index = currentWords.value.findIndex((words: any) => words.title == title)
        if (index != -1) router.push(`/words/${userID.value}/${index}/?type=start`)
      }
      return { folderItem, isLoader, redirectWords }
    }
  })
</script>
