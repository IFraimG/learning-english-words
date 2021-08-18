<template>
  <header v-if="isAuth" class="header">
    <div class="header__content">
      <div class="header__left">
        <h1>MyOcean English project</h1>
      </div>
      <div class="header__right">
        <router-link class="header-link" to="/account">{{ t("header.profile") }}</router-link>
        <router-link class="header-link" to="/dictionary">{{ t("header.dictionary") }}</router-link>
        <router-link class="header-link" to="/folders">{{ t("header.sections") }}</router-link>
        <p class="header-link" @click="logout">{{ t("header.logout") }}</p>
        <ChooseLang />
      </div>
      <div ref="panelLogo" class="menu__panel" @click="openPanel">
        <span class="menu__panel-icon"></span>
      </div>
      <div ref="menu" class="menu">
        <div class="menu__content">
          <router-link class="header-link menu-link" to="/account">
            Профиль
          </router-link>
          <router-link class="header-link menu-link" to="/dictionary">
            Словарь
          </router-link>
          <router-link class="header-link menu-link" to="/folders">
            Разделы
          </router-link>
          <p v-if="isAuth" class="header-link menu-link" @click="logout">
            Выйти из аккаунта
          </p>
          <ChooseLang />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeUnmount, ref } from "vue"
  import { useI18n } from "vue-i18n"
  import { useRouter } from "vue-router"
  import { useStore } from "vuex"
  import ChooseLang from "./ChooseLang.vue"
  import "./scss/Header.scss"

  export default defineComponent({
    name: "Header",
    components: { ChooseLang },
    setup() {
      const store = useStore()
      const router = useRouter()

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
        t,
        logout,
        openPanel,
        menu,
        panelLogo,
        isAuth: computed(() => store.getters.isAuth),
      }
    },
  })
</script>
