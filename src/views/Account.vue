<template>
  <div v-if="!isLoader" class="account__wrapper">
    <div class="account" @mousedown="setOpenPanel(-1)">
      <div class="account__left">
        <Profile :profile="profile" />
        <DictionaryVidget />
        <CreateFolder />
        <h3 v-if="wordsLength > 0" class="account__left-words">{{ t("account.allWords") }}: {{ wordsLength }}</h3>
      </div>
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
  import { computed, defineComponent, onMounted, provide, reactive, ref } from "vue"
  import { useStore } from "vuex"

  import Loader from "../components/app/Loader.vue"
  import Profile from "../components/account/Profile.vue"
  import FindWord from "../components/account/FindWord.vue"
  import DictionaryVidget from "../components/account/DictionaryVidget.vue"
  import WordsTable from "../components/account/WordsTable.vue"
  import CreateFolder from "../components/folders/CreateFolder.vue"
  import Paginator from "@/components/app/Paginator.vue"
  import { useI18n } from "vue-i18n"

  export default defineComponent({
    name: "Account",
    components: {
      Loader,
      Profile,
      FindWord,
      WordsTable,
      DictionaryVidget,
      VPagination,
      CreateFolder,
      Paginator,
    },
    setup() {
      const store = useStore()
      const isOpenPanel = reactive({ value: -1 })
      const wordsIndex = ref(1)

      const { t } = useI18n()
      provide("Ti18N", t)

      const currentWords = computed(() => store.getters.currentWords)
      const isLoader = computed(() => store.getters.isLoader)
      const profile = computed(() => store.getters.profile)
      const findWords = computed(() => store.getters.findWords)
      const wordsLength = computed(() => store.getters.wordsLength)

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

      const reverseWords = computed(() => {
        const newArray: Array<any> = []
        let currentWordsCopy = currentWords.value
        if (findWords.value.length > 0) currentWordsCopy = findWords.value
        for (let i = currentWordsCopy.length - 1; i >= 0; i--) {
          newArray.push(currentWordsCopy[i])
        }
        newArray.unshift({})
        return newArray
      })

      return {
        t,
        setOpenPanel,
        editPage,
        previousPage,
        nextPage,
        reverseWords,
        isOpenPanel,
        currentWords,
        isLoader,
        profile,
        findWords,
        wordsLength,
        wordsIndex,
        findWord,
      }
    },
  })
</script>
