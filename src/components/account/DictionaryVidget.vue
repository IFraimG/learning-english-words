<template>
  <div class="vidget__wrapper">
    <router-link :to="{ name: 'Dictionary' }">
      <div class="vidget">
        <h2>Ведите словарь и заполняйте транскрипции !</h2>
      </div>
    </router-link>
  </div>
</template>

<script>
import "./scss/DictionaryVidget.scss";

export default {
  name: "DictionaryVidget"
};
</script>
