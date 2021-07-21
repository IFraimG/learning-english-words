<template>
  <ul class="list__panel-content">
    <li class="list__panel-item" @click.stop="$emit('editWords')">Изменить</li>
    <li class="list__panel-item">Удалить</li>
    <li class="list__panel-item" @click="$emit('setOpenPanel')">Отмена</li>
  </ul>
</template>

<script>
// не используется !!!
import { defineComponent } from "vue";

export default defineComponent({
  name: "WordsEditHeader"
})
</script>
