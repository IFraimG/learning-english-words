<template>
  <div v-if="!isLoader" class="account__wrapper">
    <div class="account" @mousedown="setOpenPanel(-1)">
      <AccountLeft />
      <div v-if="currentWords != null && currentWords?.length > 0" class="list" @click="setOpenPanel(-1)">
        <FindWord @findItem="findWord" />
        <div class="list__content">
          <WordsTable :words-array="reverseWords[wordsIndex]" :index="wordsIndex" :is-open-panel="isOpenPanel.value" @setOpenPanel="setOpenPanel" />
        </div>
        <Paginator @nextPage="nextPage" @previousPage="previousPage">
          <template #default>
            <v-pagination v-model="wordsIndex" :pages="reverseWords.length - 1" :range-size="1" active-color="#dddddd" @update:modelValue="editPage" />
          </template>
        </Paginator>
      </div>
      <div v-else class="list__info">
        <p>{{ t("account.notList") }}</p>
      </div>
    </div>
  </div>
  <router-view v-if="!isLoader"></router-view>
  <Loader v-else />
</template>
<script lang="ts">
  import VPagination from "@hennge/vue3-pagination"
  import "@hennge/vue3-pagination/dist/vue3-pagination.css"
  import "@/components/account/scss/Account.scss"
  import { computed, onMounted, provide, reactive, ref } from "vue"
  import { useStore } from "vuex"

  import Loader from "@/components/app/Loader.vue"
  import FindWord from "@/components/account/FindWord.vue"
  import WordsTable from "@/components/account/WordsTable.vue"
  import Paginator from "@/components/app/Paginator.vue"
  import { useI18n } from "vue-i18n"
  import AccountLeft from "@/components/account/AccountLeft.vue"

  export default {
    name: "Account",
    components: {
      Loader,
      FindWord,
      WordsTable,
      VPagination,
      Paginator,
      AccountLeft
    },
    setup() {
      const store = useStore()
      const isOpenPanel = reactive({ value: -1 })
      const wordsIndex = ref(1)

      const { t } = useI18n()
      provide("Ti18N", t)

      const currentWords = computed(() => store.getters.currentWords)
      const isLoader = computed(() => store.getters.isLoader)
      const reverseWords = computed(() => store.getters.reverseWords)
      const findWords = computed(() => store.getters.findWords)

      onMounted(() => {
        editPage(1)
        store.dispatch("getWords")
      })

      const setOpenPanel = (num: number) => (isOpenPanel.value = num)
      const editPage = (num: number) => (wordsIndex.value = num)
      const findWord = (word: string) => store.commit("FIND_TITLE", word)

      const previousPage = () => {
        if (wordsIndex.value > 1) editPage(wordsIndex.value - 1)
      }

      const nextPage = () => {
        if (wordsIndex.value < reverseWords.value.length - 1) editPage(wordsIndex.value + 1)
      }

      return {
        t,
        setOpenPanel,
        editPage,
        previousPage,
        nextPage,
        findWord,
        reverseWords,
        isOpenPanel,
        currentWords,
        isLoader,
        findWords,
        wordsIndex
      }
    },
  }
</script>
