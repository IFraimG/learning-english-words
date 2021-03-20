<template>
  <Header v-if="$store.getters.isAuth" />
  <router-view />
</template>

<style lang="scss"></style>

<script>
import Header from "@/components/app/Header.vue";
export default {
  components: { Header },
  beforeCreate() {
    this.$store.dispatch("checkUser");
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
