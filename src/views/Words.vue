<template>
  <div v-if="!isLoader">
    <english-v v-if="stateWords == 'englishV'" :len="executeWords.length" :task-num="route.query.task" @previousTask="previousTask" @nextTask="nextTask" @setFinishType="setFinishType" />
    <accordion v-else-if="stateWords == 'accordion'" />
    <Sentences v-else-if="stateWords == 'sentences'" />
    <ChooseType v-else-if="stateWords == 'start'" @setCurrentType="setCurrentType" />
    <Finish v-else-if="stateWords == 'finish'" :len="executeWords.length" />
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script lang="ts">
  import { useStore } from "vuex"
  import ChooseType from "@/components/words/ChooseType.vue"
  import EnglishV from "@/components/words/EnglishV.vue"
  import Accordion from "@/components/words/accordion/AccordionWrapper.vue"
  import Finish from "../components/words/Finish.vue"
  import Loader from "../components/app/Loader.vue"
  import Sentences from "@/components/words/Sentences.vue"
  import { computed, defineComponent, onBeforeMount, onUpdated, provide, reactive } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { useI18n } from "vue-i18n"

  export default defineComponent({
    name: "Words",
    components: { ChooseType, EnglishV, Accordion, Finish, Loader, Sentences },
    setup() {
      const route: any = useRoute()
      const router = useRouter()
      const store = useStore()
      const { t } = useI18n()

      let currentType = reactive<any>(null)

      const wordData = computed(() => store.getters.wordData)
      const currentWords = computed(() => store.getters.currentWords)

      onBeforeMount(async () => {
        await store.dispatch("loadWords", route)
        store.dispatch("loadImagesForWords")
      })

      provide("wordData", wordData)
      provide("currentWords", currentWords)
      provide("Ti18N", t)
      onUpdated(() => store.commit("CHECK_STATE_WORDS", route))

      const setCurrentType = (type: string) => {
        currentType = type
        if (window.sessionStorage.getItem("words") != null) window.sessionStorage.removeItem("words")
        else window.sessionStorage.setItem("words", String(0))

        if (window.sessionStorage.getItem("wordsMistakes") != null) window.sessionStorage.removeItem("wordsMistakes")
        else window.sessionStorage.setItem("wordsMistakes", String(0))

        if (currentType == "accordion" || currentType == "sentences") router.push(`${route.path}?type=${currentType}`)
        else router.push(`${route.path}?type=${currentType}&task=${1}`)
      }

      const previousTask = () => {
        const task = parseInt(route.query.task)
        const type = route.query.type
        const path = route.path
        router.push(`${path}?type=${type}&task=${task - 1}`)
      }

      const nextTask = () => {
        const task = parseInt(route.query.task)
        const type = route.query.type
        const path = route.path
        router.push(`${path}?type=${type}&task=${task + 1}`)
      }

      const setFinishType = () => router.push(`${route.path}?type=finish`)

      return {
        setCurrentType,
        setFinishType,
        nextTask,
        previousTask,
        currentType,
        route,
        wordData,
        currentWords,
        stateWords: computed(() => store.getters.stateWords),
        isLoader: computed(() => store.getters.isLoader),
        executeWords: computed(() => store.getters.executeWords),
      }
    },
  })
</script>
