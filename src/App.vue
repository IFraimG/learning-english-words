<template>
  <Header v-if="$store.getters.isAuth" />
  <div class="root__wrapper">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
  import Header from "@/components/app/Header.vue"
  import { onMounted } from "vue"
  import { useStore } from "vuex"

  export default {
    components: { Header },
    setup() {
      onMounted(() => {
        const store = useStore()

        if (window.localStorage.getItem("theme") == null) {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) store.dispatch("setTheme", "dark")
          else store.dispatch("setTheme", "light")
        } else {
          const theme = window.localStorage.getItem("theme")
          store.dispatch("setTheme", theme)
        }
      })
    },
  }
</script>
