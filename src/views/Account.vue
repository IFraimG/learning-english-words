<template>
  <div v-if="!isLoader" class="account__wrapper">
    <div class="account" @mousedown="setOpenPanel(-1)">
      <AccountLeft />
      <div v-if="currentWords != null && currentWords?.length > 0 && !isPushingWord" class="list" @click="setOpenPanel(-1)">
        <FindWord @editPage="editPage" @findItem="findWord" />
        <div class="list__content">
          <WordsTable :words-array="reverseWords[wordsIndex]" :index="wordsIndex" :is-open-panel="isOpenPanel.value" @setOpenPanel="setOpenPanel" />
        </div>
        <Paginator @nextPage="nextPage" @previousPage="previousPage">
          <template #default>
            <v-pagination v-model="wordsIndex" :pages="reverseWords.length - 1" :range-size="1" active-color="#dddddd" @update:modelValue="editPage" />
          </template>
        </Paginator>
      </div>
      <div v-else-if="(currentWords == null || currentWords?.length > 0) && !isPushingWord" class="list__info list__noinfo">
        <p>{{ t("account.notList") }}</p>
      </div>
      <div v-else-if="isPushingWord">
        <account-making-words />
      </div>
    </div>
  </div>
  <router-view v-if="!isLoader" />
  <Loader v-else />
</template>
<script lang="ts">
  import VPagination from "@hennge/vue3-pagination"
  import "@hennge/vue3-pagination/dist/vue3-pagination.css"
  import "@/components/account/scss/Account.scss"
  import { computed, onBeforeMount, provide, reactive, ref } from "vue"
  import { useStore } from "vuex"

  import Loader from "@/components/app/Loader.vue"
  import FindWord from "@/components/account/FindWord.vue"
  import WordsTable from "@/components/account/WordsTable.vue"
  import Paginator from "@/components/app/Paginator.vue"
  import { useI18n } from "vue-i18n"
  import AccountLeft from "@/components/account/AccountLeft.vue"
  import WordsInterface, { WordInterface } from '@/models/words'
  import { useRoute } from 'vue-router'
  import AccountMakingWords from '@/components/account/AccountMakingWords.vue'

  export default {
    name: "Account",
    components: {
      Loader,
      FindWord,
      WordsTable,
      VPagination,
      Paginator,
      AccountLeft,
      AccountMakingWords
    },
    setup() {
      const store = useStore()
      const route = useRoute()
      const isOpenPanel = reactive({ value: -1 })
      const wordsIndex = ref<number>(1)
      const isPushingWord = computed(() => store.getters.isPushingWord)
      
      const { t } = useI18n()
      provide("Ti18N", t)

      const currentWords = computed<WordsInterface[]>(() => store.getters.currentWords)
      const isLoader = computed<boolean>(() => store.getters.isLoader)
      const reverseWords = computed<WordInterface[]>(() => store.getters.reverseWords)
      const findWords = computed<WordInterface[]>(() => store.getters.findWords)

      onBeforeMount(() => {
        editPage(1)
        store.dispatch("defineUser", route.params.id)
        store.dispatch("getWords", route.params.id);
      })

      const setOpenPanel = (num: number) => isOpenPanel.value = num

      const editPage = (num: number) => wordsIndex.value = num
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
        wordsIndex,
        isPushingWord
      }
    },
  }
</script>