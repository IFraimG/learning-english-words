<template>
  <div>rgfedw</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Folders",
  setup() {
    const store = useStore()

    onMounted(() => store.dispatch("getFoldersList"))
  }
})
</script>
