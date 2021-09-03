<template>
  <div class="vidget__wrapper">
    <router-link :to="{ name: 'Dictionary' }">
      <button class="vidget">
        <h2>Ведите словарь и заполняйте транскрипции !</h2>
      </button>
    </router-link>
  </div>
</template>

<script>
  import "./scss/DictionaryVidget.scss"

  export default {
    name: "DictionaryVidget",
  }
</script>
