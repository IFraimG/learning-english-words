<template>
  <div v-if="!isLoader">
    <english-t
      @previousTask="previousTask"
      @nextTask="nextTask"
      @setFinishType="setFinishType"
      :taskNum="route.query.task"
      :wordData="wordData"
      v-if="stateWords == 'englishT'"
    />
    <english-v
      :len="executeWords.length"
      @previousTask="previousTask"
      @nextTask="nextTask"
      @setFinishType="setFinishType"
      :taskNum="route.query.task"
      v-else-if="stateWords == 'englishV'"
    />
    <accordion
      @setFinishType="setFinishType"
      :currentWords="currentWords"
      v-else-if="stateWords == 'accordion'"
    />
    <Sentences v-else-if="stateWords == 'sentences'" />
    <ChooseType
      @setCurrentType="setCurrentType"
      v-else-if="stateWords == 'start'"
    />
    <Finish :len="executeWords.length" v-else-if="stateWords == 'finish'" />
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import ChooseType from "@/components/words/ChooseType.vue";
import EnglishT from "@/components/words/EnglishT.vue";
import EnglishV from "@/components/words/EnglishV.vue";
import Accordion from "@/components/words/Accordion.vue";
import Finish from "../components/words/Finish.vue";
import Loader from "../components/app/Loader.vue";
import Sentences from '@/components/words/Sentences.vue';
import { computed, defineComponent, onBeforeMount, onUpdated, provide, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: "Words",
  components: { ChooseType, EnglishT, EnglishV, Accordion, Finish, Loader, Sentences },
  setup() {
    const route: any = useRoute()
    const router = useRouter()
    const store = useStore()

    let currentType = reactive<any>(null)

    let wordData = computed(() => store.getters.wordData)
    let currentWords = computed(() => store.getters.currentWords)

    onBeforeMount(() => {
      store.dispatch("loadWords", route);
      store.dispatch("getListWords", route);
    })

    provide("wordData", wordData)
    provide("currentWords", currentWords)
    onUpdated(() => store.commit("CHECK_STATE_WORDS", route))

    const setCurrentType = (type: string) => {
      currentType = type;
      if (window.sessionStorage.getItem("words") != null)
        window.sessionStorage.removeItem("words");
      else window.sessionStorage.setItem("words", String(0));

      if (window.sessionStorage.getItem("wordsMistakes") != null)
        window.sessionStorage.removeItem("wordsMistakes");
      else window.sessionStorage.setItem("wordsMistakes", String(0));

      if (type == "accordion" || type == "sentences") router.push(`${route.path}?type=${currentType}`);
      else router.push(`${route.path}?type=${currentType}&task=${1}`);
    }

    const previousTask = () => {
      let task = parseInt(route.query.task);
      let type = route.query.type;
      let path = route.path;
      router.push(`${path}?type=${type}&task=${task - 1}`);
    }

    const nextTask = () => {
      let task = parseInt(route.query.task);
      let type = route.query.type;
      let path = route.path;
      router.push(`${path}?type=${type}&task=${task + 1}`);
    }

    const setFinishType = () => router.push(`${route.path}?type=finish`);

    return {
      setCurrentType, setFinishType, nextTask, 
      previousTask, currentType, route, wordData, currentWords,
      stateWords: computed(() => store.getters.stateWords),
      isLoader: computed(() => store.getters.isLoader),
      executeWords: computed(() => store.getters.executeWords),
    }
  }
})
</script>
