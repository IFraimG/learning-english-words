<template>
  <div style="padding: 10px 0;" v-if="reverseWords != null && reverseWords.length > 0">
    <button class="profile__run" @click="exportHandle">{{ Ti18N("exportWords") }}</button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import { useStore } from "vuex";

  export default defineComponent({
    name: "ExportWords",
    inject: ["Ti18N"],
    setup() {
      const store = useStore()
      const reverseWords = computed(() => store.getters.reverseWords)

      const exportHandle = () => {
        const wordsReady = reverseWords.value.filter((words: any) => words?.words != null)
        console.log(wordsReady);
        

        const link = document.createElement("a")
        const fileBLOB = new Blob([JSON.stringify(wordsReady)], { type: "application/json" })

        link.href = URL.createObjectURL(fileBLOB)
        link.download = `myoceanwords.json`;
        link.click();
      }

      return { exportHandle, reverseWords }
    }
  })
</script>
