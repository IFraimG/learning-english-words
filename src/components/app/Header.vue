<template>
  <header v-if="isAuth" class="header">
    <div class="header__content">
      <div class="header__left">
        <img src="@/assets/logo1234.svg" alt="logo">
        <h1>MyOcean project</h1>
      </div>
      <div class="header__right">
        <router-link class="root-link header-link" :to="'/account/' + id">{{ t("header.profile") }}</router-link>
        <router-link class="root-link header-link" to="/dictionary">{{ t("header.dictionary") }}</router-link>
        <router-link class="root-link header-link" to="/folders">{{ t("header.sections") }}</router-link>
        <router-link class="root-link header-link" to="/accounts">{{ t("header.users") }}</router-link>
        <p class="root-link header-link" @click="logout">{{ t("header.logout") }}</p>
        <ChooseLang />
      </div>
      <div ref="panelLogo" class="menu__panel" @click="openPanel">
        <span class="menu__panel-icon"></span>
      </div>
      <div ref="menu" class="menu">
        <div class="menu__content">
          <router-link class="root-link menu-link" :to="'/account/' + id">
            {{ t("header.profile") }}
          </router-link>
          <router-link class="root-link menu-link" to="/dictionary">
            {{ t("header.dictionary") }}
          </router-link>
          <router-link class="root-link menu-link" to="/folders">
            {{ t("header.sections") }}
          </router-link>
          <router-link class="root-link menu-link" to="/accounts">
            {{ t("header.sections") }}
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
  import { Router, useRouter } from "vue-router"
  import { useStore } from "vuex"
  import ChooseLang from "./ChooseLang.vue"
  import "./scss/header/Header.scss"

  export default defineComponent({
    name: "Header",
    components: { ChooseLang },
    setup() {
      const store = useStore()
      const router: Router = useRouter()

      const id = computed(() => store.getters.userID)

      const { t } = useI18n({ useScope: 'global' })

      const menu = ref<any>(null)
      const panelLogo = ref<any>(null)

      const logout = () => store.dispatch("logout")
      const openPanel = () => {
        menu.value.classList.toggle("menu__active")
        panelLogo.value.classList.toggle("menu__panel-active")
      }

      router.beforeEach(() => {
        menu.value.classList.remove("menu__active")
        panelLogo.value.classList.remove("menu__panel-active")
      })

      return {
        t, id, logout, openPanel, menu, panelLogo, isAuth: computed(() => store.getters.isAuth),
      }
    },
  })
</script>
