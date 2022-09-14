<template>
  <div class="translation__wrapper">
    <div class="translation">
      <h1>Узнать перевод слова</h1>
      <div class="translation__radio">
        <div class="translation__lang">
          <label class="translation__container">RU
            <input type="radio" value="ru" name="lang" v-model="radioLang" />
            <span class="translation__checkmark"></span>
          </label>
        </div>
        <div class="translation__lang">
          <label class="translation__container">EN
            <input type="radio" value="en" name="lang" v-model="radioLang" />
            <span class="translation__checkmark"></span>
          </label>
        </div>
      </div>
      <div class="translation__inputs">
        <input @keydown.enter="findTanslate" v-model="wordTranslation" class="input-light" type="text" />
        <button class="profile__run" @click="findTanslate">Искать</button>
      </div>
      <div class="translation__result">
        <!-- <p>Cat - кот</p>
        <p>В вашем словаре нет такого слова !</p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue"
  import { useStore } from "vuex"
  import "./scss/translations/Translation.scss"

  export default defineComponent({
    name: "TranslateWord",
    setup() {
      const store = useStore()
      const wordTranslation = ref("")
      const radioLang = ref<any>("ru")

      const findTanslate = async () => {
        await store.dispatch("setOwnTranslate", { lang: radioLang.value, word: wordTranslation.value })
      }

      return { findTanslate, wordTranslation, radioLang }
    },
  })
</script>
