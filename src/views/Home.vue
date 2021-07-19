<template>
  <HomeContent />
</template>

<script>
import { mapGetters } from "vuex";
import HomeContent from "@/components/app/Home"

export default {
  name: "Home",
  components: { HomeContent },
  computed: {
    ...mapGetters(["loginInfo", "errorsList", "isAuth"])
  }
};
</script>