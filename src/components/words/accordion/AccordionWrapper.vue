<template>
  <div class="accordion__wrapper">
    <div class="accordion">
      <div class="accordion__content">
        <div class="accordion__header">
          <h1>Гармошка</h1>
          <button class="profile__run" @click="setVolume">
            <img v-if="isVolume" src="@/assets/turnon.png" />
            <img v-else src="@/assets/turnoff.png" />
          </button>
        </div>
        <Accordion :currentWords="currentWords" :isVolume="isVolume" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import "./scss/Accordion.scss"
  import { computed, defineComponent, ref } from "vue"
  import { useStore } from "vuex"
  import Accordion from "./Accordion.vue"

  // isRotate - true - en | !isRotate - false - ru
  export default defineComponent({
    name: "AccordionWrapper",
    components: { Accordion },
    setup() {
      const isVolume = ref(true)
      const setVolume = () => isVolume.value = !isVolume.value
      const store = useStore()

      const currentWords = computed(() => store.getters.currentWords)

      return { isVolume, setVolume, currentWords }
    }
  })
</script>
