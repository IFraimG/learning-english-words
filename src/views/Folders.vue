<template>
  <div v-if="!isLoader" class="folders__wrapper">
    <div class="folders">
      <h1>Полный список разделов</h1>
      <div class="folders__content">
        <div class="folders__item" v-for="(item, index) in foldersList" :key="index">
          <router-link :to="{ name: 'FolderPage', params: { id: item.key }}">
            <h2>{{ item.title }}</h2>
            <div class="folders__list-words" v-if="item.firstModule != null">
              <div v-for="(words, index) of item.firstModule" :key="index">
                <p class="list__item">
                  <span class="list__english">{{ words.english }}</span>
                  -
                  <span class="list__russian">{{ words.russian }}</span>
                </p>
              </div>
            </div>
            <div class="folders__list-nowords" v-else>
              <p>Вы сюда ничего не добавили</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <Loader v-else />
</template>

<script lang="ts">
import Loader from "@/components/app/Loader.vue";
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import "@/components/account/scss/Account.scss";
import "@/components/folders/scss/Folders.scss"

export default defineComponent({
  name: "Folders",
  components: { Loader },
  setup() {
    const store = useStore()
    const folders = computed(() => store.getters.folders)
    const isLoader = computed(() => store.getters.isLoaderItem)

    onMounted(() => store.dispatch("getFoldersList"))
    let foldersList = computed(() => {
      let arr: any[] = []
      if (folders.value != null) {
        let keysArr: string[] = Object.keys(folders.value)
        let firstModule = folders.value?.listModules == null ? null : folders.value.listModules[0]

        keysArr.map((key: string, index: number) => arr[index] = { 
          title: folders.value[key].title, id: folders.value[key].id,
          firstModule: firstModule, key
        })
      }
      return arr
    })
    
    return { folders, isLoader, foldersList }
  }
})
</script>
