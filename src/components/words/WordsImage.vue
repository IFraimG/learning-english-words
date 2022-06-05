<template>
  <img class="accordion__image" v-if="imgUrl != null" :src="imgUrl" alt="img" @click="openImage" object-fit="cover">
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { useRoute, useRouter } from "vue-router"

  export default defineComponent({
    name: "WordsImage",
    props: {
      imgUrl: String
    },
    setup(props: any) {
      const router = useRouter()
      const route = useRoute()

      const openImage = () => router.push(`${route.fullPath}&img=${props.imgUrl}`)

      return { openImage }
    }
  })
</script>