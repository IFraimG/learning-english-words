<template>
  <div class="vidget__wrapper">
    <router-link :to="{ name: 'Dictionary' }">
      <button class="vidget">
        <h2>{{ Ti18N("account.fillUpDictionary") }}</h2>
      </button>
    </router-link>
  </div>
</template>

<script>
  import "./scss/DictionaryVidget.scss"

  export default {
    name: "DictionaryVidget",
    inject: ["Ti18N"]
  }
</script>
