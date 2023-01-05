<template>
  <div class="translation__wrapper">
    <div class="translation">
      <div class="translation__left">
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
      </div>
      <div class="translation__result" :style="result?.ruWord != '' && result?.enWord != '' ? '' : 'visibility: hidden'">
        <p v-if="result?.ruWord != '' && result?.enWord != ''">{{ result.enWord }} - {{ result.ruWord }}</p>
        <button ref="btn" class="profile__run modal-button__run" @click="addToDictionary">Добавить в данный словарь</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { WordInterface } from "@/models/words"
  import generateID from "@/utils/generateID"
  import { computed, defineComponent, ref } from "vue"
  import { useStore } from "vuex"
  import "./scss/translations/Translation.scss"

  export default defineComponent({
    name: "TranslateWord",
    props: {
      index: Number
    },
    setup(props: any) {
      const store = useStore()
      const wordTranslation = ref("")
      const radioLang = ref<any>("ru")
      const currentDictionary = computed(() => store.getters.currentDictionary)
      const userID = computed(() => store.getters.profile.id)
      const result = computed<{ ruWord: string, enWord: string }>(() => store.getters.translatedDictResults)
      const btn = ref<any>(null)

      const findTanslate = async () => {
        await store.dispatch("setOwnTranslate", { toLang: radioLang.value == "en" ? "ru" : "en", word: wordTranslation.value, fromLang: radioLang.value })
        wordTranslation.value = ""
      }

      const addToDictionary = async () => {
        btn.value.disabled = true
        await store.dispatch("sendEditWords", {
          title: currentDictionary.value.title,
          id: currentDictionary.value.id,
          editWords: [...currentDictionary.value.words, { english: result.value.enWord, russian: result.value.ruWord, id: generateID(currentDictionary.value.words.map((item: WordInterface) => item.id)) }],
          userid: userID.value,
          wordsid: props.index,
        })
        store.commit("SET_TRANSLATED_DICT_WORDS", { enWord: "", ruWord: "" })
        btn.value.disabled = false
      }

      return { findTanslate, wordTranslation, radioLang, result, addToDictionary, btn }
    },
  })
</script>
