<template>
  <div class="paginator">
    <span class="paginator__arrow paginator__arrow-left" @click="previousPage">
      <img src="@/assets/arrow-right.png" alt="назад" />
    </span>
    <div>
      <slot></slot>
    </div>
    <span class="paginator__arrow" @click="nextPage">
      <img src="@/assets/arrow-right.png" alt="вперед" />
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    name: "Paginator",
    emits: ["previousPage", "nextPage"],
    setup(_: any, { emit }: any) {
      const previousPage = () => emit("previousPage")
      const nextPage = () => emit("nextPage")

      return { previousPage, nextPage }
    },
  })
</script>

<style lang="scss" scoped>
  .paginator {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px 0;
    margin: 20px;
    margin-top: 30px;
    font-family: "Montserrat", "Helvetica";
    &__arrow {
      padding: 0 20px;
      cursor: pointer;
      img {
        width: 24px;
        height: 24px;
      }
      &-left {
        margin-bottom: 5px;
        padding-left: 5px;
        transform: rotate(180deg);
      }
    }
  }
</style>
