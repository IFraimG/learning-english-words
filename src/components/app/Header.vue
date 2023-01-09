<template>
  <header v-if="isAuth" class="header">
    <div class="header__content">
      <div class="header__left">
        <img src="@/assets/logo1234.svg" alt="logo">
        <h1>Океан слов</h1>
      </div>
      <div class="header__right">
        <div @click="handleLink" class="root-link header-link">{{ t("header.profile") }}</div>
        <router-link class="root-link header-link" to="/dictionary" tag="button">{{ t("header.dictionary") }}</router-link>
        <router-link class="root-link header-link" to="/folders" tag="button">{{ t("header.sections") }}</router-link>
        <router-link class="root-link header-link" to="/accounts" tag="button">{{ t("header.users") }}</router-link>
        <p class="root-link header-link" @click="logout">{{ t("header.logout") }}</p>
        <ChooseLang />
      </div>
      <div ref="panelLogo" class="menu__panel" @click="openPanel">
        <span class="menu__panel-icon"></span>
      </div>
      <div ref="menu" class="menu">
        <div class="menu__content">
          <div @click="handleLink" class="root-link menu-link">
            {{ t("header.profile") }}
          </div>
          <router-link class="root-link menu-link" to="/dictionary">
            {{ t("header.dictionary") }}
          </router-link>
          <router-link class="root-link menu-link" to="/folders">
            {{ t("header.sections") }}
          </router-link>
          <router-link class="root-link menu-link" to="/accounts">
            {{ t("header.users") }}
          </router-link>
          <p v-if="isAuth" class="root-link menu-link" @click="logout">
            {{ t("header.logout") }}
          </p>
          <ChooseLang />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue"
  import { useI18n } from "vue-i18n"
  import { Router, useRoute, useRouter } from "vue-router"
  import { useStore } from "vuex"
  import ChooseLang from "./ChooseLang.vue"
  import "./scss/header/Header.scss"

  export default defineComponent({
    name: "Header",
    components: { ChooseLang },
    setup(props, ctx) {
      const store = useStore()
      const router: Router = useRouter()
      const route = useRoute()

      const id = computed(() => store.getters.userID)

      const { t } = useI18n({ useScope: 'global' })

      const menu = ref<any>(null)
      const panelLogo = ref<any>(null)

      const logout = () => store.dispatch("logout")
      const openPanel = () => {
        menu.value.classList.toggle("menu__active")
        panelLogo.value.classList.toggle("menu__panel-active")
      }

      const handleLink = () => {
        if (route.name == "Account" && route.params.id != id.value) router.push({ name: "Account", params: { id: id.value }, replace: true }).then(() => window.location.reload())
        else router.push({ name: "Account", params: { id: id.value }})
      }

      router.beforeEach((to, from) => {
        menu.value.classList.remove("menu__active")
        panelLogo.value.classList.remove("menu__panel-active")
      })

      return {
        t, id, logout, openPanel, menu, panelLogo, isAuth: computed(() => store.getters.isAuth), handleLink,
      }
    },
  })
</script>
