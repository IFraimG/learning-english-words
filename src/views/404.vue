<template>
  <div class="not-found__wrapper">
    <div class="not-found">
      <div class="not-found__content">
        <h1>{{ t("notFound.title") }}</h1>
        <img src="@/assets/404.webp" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { useI18n } from "vue-i18n"

  const Component = defineComponent({
    name: "NotFound",
    setup() {
      const { t } = useI18n()

      return { t }
    },
  })

  export default Component
</script>

<style lang="scss" scoped>
  .not-found {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    &__wrapper {
      height: 100%;
      width: 100%;
    }
    &__content {
      font-family: "Helvetica";
      text-align: center;
      img {
        width: 256px;
        height: 256px;
        object-fit: cover;
        margin: 30px 0;
      }
      p {
        font-size: 24px;
      }
    }
  }
</style>
