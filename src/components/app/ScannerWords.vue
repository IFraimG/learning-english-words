<template>
  <div class="scanner-words">
    <router-link :to="$route.fullPath + '/scanner'" tag="button" class="modal-button__run scanner-words__btn">Загрузите сфотографированный список слов</router-link>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    name: "ScannerWords",
    setup(_: any, { emit }: any) {
      
      return {}
    },
  })
</script>

<style scope lang="scss">
  .scanner-words {
    padding: 10px 20px;
    &__btn {
      font-size: 18px;
      color: #fff;
      padding: 10px;
      cursor: pointer;
      border-radius: 9px;
      font-weight: bold;
      @media (max-width: 521px) {
        font-size: 14px;
      }
      @media (max-width: 421px) {
        font-size: 12px;
      }
      @media (max-width: 379px) {
        font-size: 10px;
      }
    }
  }
</style>
