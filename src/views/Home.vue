<template>
  <HomeContent />
</template>

<script>
import { mapGetters } from "vuex";
import HomeContent from "@/components/app/Home"

export default {
  name: "Home",
  components: { HomeContent },
  // methods: {
  //   getOffset(el) {
  //     const rect = el.getBoundingClientRect();
  //     const scrollLeft =
  //       window.pageXOffset || document.documentElement.scrollLeft;
  //     const scrollTop =
  //       window.pageYOffset || document.documentElement.scrollTop;
  //     return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  //   }
  // },
  computed: {
    ...mapGetters(["loginInfo", "errorsList", "isAuth"])
  }
};
</script>