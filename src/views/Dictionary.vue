<template>
  <div class="dictionary">
    <TranslateWord v-if="!isLoader" />
    <div v-if="!isLoader && pagesDictionary != null">
      <FindWord style="margin-top: 50px" @findItem="findModule" />
      <DictionaryTable :currentPage="currentColumn" />
      <Paginator @nextPage="nextPage" @previousPage="previousPage">
        <template #default>
          <VPagination v-model="currentColumn" :pages="pagesDictionary" :range-size="1" active-color="#dddddd" @update:modelValue="editPage" />
        </template>
      </Paginator>
    </div>
    <div v-if="pagesDictionary == null && !isLoader" style="margin-top: 50px; font-size: 32px">
      <h1>Ваш словарь пуст</h1>
    </div>
    <Loader v-if="isLoader" />
  </div>
</template>

<script lang="ts">
  import VPagination from "@hennge/vue3-pagination"
  import "@hennge/vue3-pagination/dist/vue3-pagination.css"
  import "@/components/dictionary/scss/Dictionary.scss"
  import Loader from "../components/app/Loader.vue"
  import Paginator from "../components/app/Paginator.vue"
  import FindWord from "../components/account/FindWord.vue"
  import TranslateWord from "../components/dictionary/TranslateWord.vue"
  import { computed, defineComponent, onMounted, ref } from "vue"
  import { useStore } from "vuex"
  import DictionaryTable from "@/components/dictionary/DictionaryTable.vue"
  import WordsInterface from "@/models/words"

  export default defineComponent({
    name: "Dictionary",
    components: { Loader, VPagination, Paginator, FindWord, TranslateWord, DictionaryTable },
    setup() {
      const store = useStore()

      const userID = computed<number>(() => store.getters.userID)
      const pagesDictionary = computed<number>(() => store.getters.pagesDictionary)
      const currentWords = computed<WordsInterface[]>(() => store.getters.currentWords)
      const isLoader = computed<boolean>(() => store.getters.isLoader)
      const currentColumn = ref<number>(1)

      const editPage = (page: number) => {
        currentColumn.value = page
        store.dispatch("getCurrentDictionaryWords", { id: userID.value, query: currentColumn.value - 1 })
      }

      onMounted(() => {
        editPage(1)
        store.dispatch("getDictionaryWords", userID.value).then(() => {
          if (pagesDictionary.value == null) store.dispatch("addDictionaryWords", { id: userID.value, words: currentWords.value })
        })
      })

      const previousPage = () => {
        if (currentColumn.value > 1) editPage(currentColumn.value - 1)
      }

      const nextPage = () => {
        if (currentColumn.value < pagesDictionary.value - 1) editPage(currentColumn.value + 1)
      }

      const findModule = (title: string) => store.commit("FIND_DICTIONARY_TITLE", title)

      return {
        currentColumn, editPage, previousPage, nextPage,
        findModule, isLoader, pagesDictionary
      }
    }
  })
</script>
