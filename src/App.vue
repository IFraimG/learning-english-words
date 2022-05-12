<template>
  <Header v-if="$store.getters.isAuth" />
  <div class="root__wrapper">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <div :key="routeAnimation">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script>
  import Header from "@/components/app/Header.vue"
  import { computed, onMounted } from "vue"
  import { useStore } from "vuex"
  import { useRoute } from 'vue-router'

  export default {
    components: { Header },
    setup() {
      const store = useStore()
      const route = useRoute()

      onMounted(() => {
        if (window.localStorage.getItem("theme") == null) {
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) store.dispatch("setTheme", "dark")
          else store.dispatch("setTheme", "light")
        } else {
          const theme = window.localStorage.getItem("theme")
          store.dispatch("setTheme", theme)
        }
      })

      const routeAnimation = computed(() => {
        return route.fullPath.split("/")[1]
      })

      return { routeAnimation }
    },
  }
</script>
