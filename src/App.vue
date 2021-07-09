<template>
  <Header v-if="$store.getters.isAuth" />
  <router-view v-slot="{ Component, route }">
    <transition name="fade" appear>
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script>
import Header from "@/components/app/Header.vue";

export default {
  components: { Header }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
