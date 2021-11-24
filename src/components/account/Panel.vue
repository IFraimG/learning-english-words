<template>
  <ul class="list__panel-content">
    <li class="list__panel-item" @click.stop="$emit('editWords', words, title)">
      {{ Ti18N("account.wordsTable.panel.change") }}
    </li>
    <li class="list__panel-item">
      <router-link :to="'/account/setupfolder?title=' + title">
        {{ Ti18N("account.wordsTable.panel.addToSection") }}
      </router-link>
    </li>
    <li class="list__panel-item" @click="$emit('openModal'); $emit('setOpenPanel', -1)">
      {{ Ti18N("account.wordsTable.panel.newWords") }}
    </li>
    <li class="list__panel-item" @click="$emit('setOpenPanel')">
      <router-link :to="'/account/delete?title=' + title">
        {{ Ti18N("account.wordsTable.panel.delete") }}
      </router-link>
    </li>
    <li class="list__panel-item" @click="$emit('setOpenPanel')">
      {{ Ti18N("account.wordsTable.panel.cancel") }}
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    name: "Panel",
    inject: ["Ti18N"],
    emits: ["openModal", "setOpenPanel", "editWords"],
    props: {
      title: String,
      words: Array
    },
  })
</script>
