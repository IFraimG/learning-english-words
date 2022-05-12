<template>
  <div class="list__item">
    <span v-if="words?.enValues == null" :ref="el => enItemsInfo[0] = el" class="list__english">{{ words.english }}</span>
    <span v-else>
      <span class="list__english" v-for="(item, index) of words.enValues" :key="item" :ref="el => { if (el) enItemsInfo[index] = el }">
        {{ item }}
        <span v-if="index != words.enValues.length - 1">, </span>
      </span>
    </span>
    <div class="list__border"></div>
    <span v-if="words?.ruValues == null" class="list__russian" :ref="el => itemsInfo[0] = el">{{ words.russian }}</span>
    <span v-else class="list__russian-wrapper">
      <span class="list__russian" v-for="(item, index) of words.ruValues" :key="item" :ref="el => { if (el) itemsInfo[index] = el }">
        {{ item }}
      </span>
    </span>
  </div>
</template>

<script lang="ts">
  import { WordEdit, WordInterface } from "@/models/words"
  import { defineComponent, nextTick, onActivated, onMounted, onRenderTriggered, onUpdated, Ref, ref, toRefs, watch } from "@vue/runtime-core"

  export default defineComponent({
    name: "WordsList",
    props: {
      words: Object,
      index: Number
    },
    setup(props: any) {
      const itemsInfo: Ref<any[]> = ref([])
      const enItemsInfo: Ref<any[]> = ref([])

      const setWidthText = () => {
        if (itemsInfo.value.length > 1) {
          // itemsInfo.value[0].classList.remove("list__russian")
          const len = itemsInfo.value.length - 1
          for (let i = 0; i < len; i++) {
            const text = itemsInfo.value[i].textContent.split("")
            for (let j = 0; j < text.length; j++) {
              if (text[j] === ",") text.splice(j, 1)
            }

            text.push(",")
            itemsInfo.value[i].textContent = text.join("")
          }

          console.log(itemsInfo.value[0]) 
        }
        if (itemsInfo.value[0]?.offsetWidth != null && enItemsInfo.value[0]?.offsetWidth != null) {
          if (itemsInfo.value[0].offsetWidth + enItemsInfo.value[0].offsetWidth > 430) {
            const text = itemsInfo.value[0].textContent.split("")
            while (itemsInfo.value[0].offsetWidth + enItemsInfo.value[0].offsetWidth > 430) {
              text.pop()
              itemsInfo.value[0].textContent = text.join("")
            }
            const points = itemsInfo.value[0].textContent.split("")

            points.pop()
            points.pop()
            points.pop()

            points.push("...")
            itemsInfo.value[0].textContent = points.join("")
          }
        }
      }

      nextTick(() => setWidthText())
      onMounted(setWidthText)
      watch(() => props.index, (newValue, oldValue) => setWidthText())

      return { itemsInfo, enItemsInfo }
    },
  })
</script>
