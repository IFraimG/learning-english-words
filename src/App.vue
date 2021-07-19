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

export default {
  components: { Header }
};
</script>
