<template>
  <ul class="list__panel-content">
    <li class="list__panel-item" @click.stop="$emit('editWords')">Изменить</li>
    <li class="list__panel-item" @click.stop="$store.commit('HANDLER_MODAL_DELETE', true)">Удалить</li>
    <li class="list__panel-item" @click="$emit('setOpenPanel')">Отмена</li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "WordsEditHeader",
  setup() {

  }
})
</script>

<style>

</style>