<template>
  <div class="spoiler__wrapper">
    <div class="spoiler">
      <div class="spoiler__content">
        <div class="spoiler__header" @click="setOpen">
          <h2 v-if="!isOpen.value" class="spoiler__title" data-type="open">
            Выбрать
          </h2>
          <h2 v-else class="spoiler__title" data-type="close">Закрыть</h2>
        </div>
        <div v-for="item of list" :key="item" :class="isOpen.value ? 'spoiler__item spoiler__active' : 'spoiler__item'">
          <p :class="isOpen.activeElement == item.key ? 'spoiler__active-text' : ''" @click="setItem(item)">
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from "vue"
  // import { EmitITFC } from "@/models/root"
  import "./scss/DropList.scss"

  export default defineComponent({
    name: "DropList",
    props: {
      list: Array,
    },
    emits: ["setItem"],
    setup(_: any, { emit }: any) {
      const isOpen = reactive({ value: false, activeElement: null })

      const setOpen = () => (isOpen.value = !isOpen.value)
      const setItem = (item: any) => {
        isOpen.activeElement = item.key
        emit("setItem", item)
      }

      return { isOpen, setOpen, setItem }
    },
  })
</script>
