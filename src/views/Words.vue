<template>
  <div v-if="!isLoader">
    <english-t
      @previousTask="previousTask"
      @nextTask="nextTask"
      @setFinishType="setFinishType"
      :taskNum="$route.query.task"
      :wordData="wordData"
      v-if="stateWords == 'englishT'"
    />
    <english-v
      :len="executeWords.length"
      @previousTask="previousTask"
      @nextTask="nextTask"
      @setFinishType="setFinishType"
      :taskNum="$route.query.task"
      :wordData="wordData"
      v-else-if="stateWords == 'englishV'"
    />
    <russian-v
      @previousTask="previousTask"
      @nextTask="nextTask"
      @setFinishType="setFinishType"
      :taskNum="$route.query.task"
      :wordData="wordData"
      v-else-if="stateWords == 'russianV'"
    />
    <ChooseType
      @setCurrentType="setCurrentType"
      v-else-if="stateWords == 'start'"
    />
    <Finish :len="executeWords.length" v-else-if="stateWords == 'finish'" />
  </div>
  <div v-else>
    Loader...
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ChooseType from '@/components/words/ChooseType.vue';
import EnglishT from '@/components/words/EnglishT.vue';
import EnglishV from '@/components/words/EnglishV.vue';
import RussianV from '@/components/words/RussianV.vue';
import Finish from '../components/words/Finish.vue';

export default {
  name: "Words",
  components: { ChooseType, EnglishT, EnglishV, RussianV, Finish },
  data() {
    return {
      currentType: null
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadWords", this.$route)
  },
  updated() {
    this.$store.commit("CHECK_STATE_WORDS", this.$route)
  },
  methods: {
    setCurrentType(type) {
      this.currentType = type
      if (window.sessionStorage.getItem("words") != null) window.sessionStorage.removeItem("words")
      else window.sessionStorage.setItem("words", 0)

      if (window.sessionStorage.getItem("wordsMistakes") != null) window.sessionStorage.removeItem("wordsMistakes")
      else window.sessionStorage.setItem("wordsMistakes", 0)

      this.$router.push(`${this.$route.path}?type=${this.currentType}&task=${1}`)
    },
    previousTask() {
      let task = parseInt(this.$route.query.task)
      let type = this.$route.query.type
      let path = this.$route.path
      this.$router.push(`${path}?type=${type}&task=${task - 1}`)
    },
    nextTask() {
      let task = parseInt(this.$route.query.task)
      let type = this.$route.query.type
      let path = this.$route.path
      this.$router.push(`${path}?type=${type}&task=${task + 1}`)
    },
    setFinishType() {
      this.$router.push(`${this.$route.path}?type=finish`)
    }
  },
  computed: {
    ...mapGetters(["stateWords", "wordData", "isLoader", "executeWords"])
  }
}
</script>

<style>

</style>