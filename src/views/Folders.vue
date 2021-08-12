<template>
  <div v-if="!isLoader" class="folders__wrapper">
    <div class="folders">
      <h1>Полный список разделов</h1>
      <div v-if="foldersList.length > 0" class="folders__content">
        <div class="folders__item-wrapper" v-for="(item, index) in foldersList" :key="index">
          <router-link :to="{ name: 'FolderPage', params: { id: item.key }}">
            <div class="folders__item">
              <h2>{{ item.title }}</h2>
              <div v-if="item.listModules != null">
                <div class="folders__title" v-for="title of item.listModules" :key="title">
                  <p>{{ title }}</p>
                </div>
              </div>
              <div class="folders__list-nowords" v-else>
                <p>Вы сюда ничего не добавили</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="folders__create" v-else>
        <CreateFolder />
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
  import CreateFolder from "@/components/folders/CreateFolder.vue";

  export default defineComponent({
    name: "Folders",
    components: { Loader, CreateFolder },
    setup() {
      const store = useStore()
      const folders = computed(() => store.getters.folders)
      const isLoader = computed(() => store.getters.isLoaderItem)

      onMounted(() => store.dispatch("getFoldersList"))

      const foldersList = computed(() => {
        let arr: any[] = []
        if (folders.value != null) {
          let keysArr: string[] = Object.keys(folders.value)

          keysArr.map((key: string, index: number) => arr[index] = { 
            title: folders.value[key].title,
            id: folders.value[key].id,
            listModules: folders.value[key]?.listModules, key
          })
        }

        return arr
      })

      return { folders, isLoader, foldersList }
    }
  })
</script>
