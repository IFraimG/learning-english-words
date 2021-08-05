<template>
  <Header v-if="$store.getters.isAuth" />
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
  import Header from "@/components/app/Header.vue";
  import { onBeforeMount } from 'vue';
  import { useStore } from 'vuex';

  export default {
    components: { Header },
    setup() {
      onBeforeMount(() => {
        const store = useStore()

        let theme = "light"
        if (window.localStorage.getItem("theme") != null) theme = window.localStorage.getItem("theme")
        store.dispatch("setTheme", theme)
      })
    }
  };
</script>
