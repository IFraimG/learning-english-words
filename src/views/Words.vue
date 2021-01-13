<template>
  <div>
    <english-t v-if="stateWords == 'englishT'" />
    <english-v v-else-if="stateWords == 'englishV'" />
    <russian-v v-else-if="stateWords == 'russianV'" />
    <ChooseType @setCurrentType="setCurrentType" v-if="stateWords == 'start'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ChooseType from '@/components/words/ChooseType.vue';
import EnglishT from '@/components/words/EnglishT.vue';
import EnglishV from '@/components/words/EnglishV.vue';
import RussianV from '@/components/words/RussianV.vue';

export default {
  name: "Words",
  components: { ChooseType, EnglishT, EnglishV, RussianV },
  data() {
    return {
      currentType: null
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadWords", this.$route)
    // this.$store.commit("CHECK_STATE_WORDS", this.$route)
  },
  updated() {
    this.$store.dispatch("loadWords", this.$route)
    // this.$store.commit("CHECK_STATE_WORDS", this.$route)
  },
  methods: {
    setCurrentType(type) {
      this.currentType = type
      this.$router.push(`${this.$route.path}?type=${this.currentType}&task=${1}`)
    }
  },
  computed: {
    ...mapGetters(["stateWords", "wordData"])
  }
}
</script>

<style>

</style>