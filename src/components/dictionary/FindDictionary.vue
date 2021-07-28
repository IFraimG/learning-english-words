<template>
  <div class="find-word__wrapper">
    <div class="find-word">
      <input
        v-model="moduleWords"
        @input="getWord"
        @keyup.enter="getWord"
        type="search"
        placeholder="Название модуля..."
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import "./scss/FindWord.scss";
import { useStore } from 'vuex';

export default {
  name: "FindWord",
  setup() {
    const store = useStore()
    let moduleWords = ref("")

    const getWord = () => {
      let word = moduleWords.value.trimLeft().trimRight().toLowerCase();
      store.commit("FIND_TITLE", word);
    }

    return {
      moduleWords, getWord
    };
  }
};
</script>
