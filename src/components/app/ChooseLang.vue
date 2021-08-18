<template>
  <p ref="translateTitle" class="lang__title lang-header-text header-link">{{ t("translation") }}</p>
  <div ref="langList" class="lang__list">
    <div v-for="(item, index) of listLangs" :key="index">
      <p @click="editLang(item)" :class="item == activeLang ? 'lang__active' : ''">{{ item }}</p>
    </div>
  </div>
  <p @click="setLangs" class="lang__title lang-menu-text header-link menu-link">{{ t("translation") }}</p>
  <div ref="langMenuList" class="lang__menu" v-if="isLang">
    <div class="lang__menu-list" v-for="(item, index) of listLangs" :key="index">
      <p class="lang__menu-item" @click="editLang(item)" :class="item == activeLang ? 'lang__active' : ''">{{ item }}</p>
      <p v-if="index != listLangs.length - 1" class="lang__menu-item">/</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { onMounted, ref } from "vue"
  import { useI18n } from "vue-i18n"
  import "./scss/chooseLang/ChooseLang.scss"

  export default {
    name: "ChooseLang",
    setup() {
      const { locale, t } = useI18n({ useScope: "global" })
      const activeLang = ref(locale.value)
      const translateTitle: any = ref(null)
      const langList: any = ref(null)
      const langMenuList: any = ref(null)
      const isLang = ref(false)

      const listLangs = ["en", "ru", "fr"]

      // Не используется !!!
      // const observer = new ResizeObserver((entries: any) => {
      //   for (const entry of entries) {
      //     const width = entry.contentRect.width
      //     if (width < 724) translateTitle.value.className = "lang__title menu-link"
      //     else translateTitle.value.className = "lang__title header-link"
      //   }
      // })
      // observer.observe(document.documentElement)

      onMounted(() => {
        const lang = window.localStorage.getItem("userlang")
        if (lang == null) {
          window.localStorage.setItem("userlang", "ru")
          locale.value = "ru"
        } else {
          activeLang.value = lang
          locale.value = lang
        }
      })

      const editLang = (lang: string) => {
        if (lang != activeLang.value) {
          activeLang.value = lang
          window.localStorage.setItem("userlang", lang)
          locale.value = lang
        }
      }

      const setLangs = () => isLang.value = !isLang.value

      return {
        t, activeLang, listLangs, editLang, isLang,
        translateTitle, langList, langMenuList, setLangs
      }
    },
  }
</script>
