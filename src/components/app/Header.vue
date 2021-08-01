<template>
  <header v-if="isAuth" class="header">
    <div class="header__content">
      <div class="header__left">
        <h1>MyOcean English project</h1>
      </div>
      <div class="header__right">
        <router-link class="header-link" to="/account">Профиль</router-link>
        <router-link class="header-link" to="/dictionary">Словарь</router-link>
        <router-link class="header-link" to="/folders">Разделы</router-link>
        <p class="header-link" @click="logout">Выйти из аккаунта</p>
      </div>
      <div ref="panelLogo" @click="openPanel" class="menu__panel">
        <span class="menu__panel-icon"></span>
      </div>
      <div class="menu" ref="menu">
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
          <p class="header-link menu-link" v-if="isAuth" @click="logout">
            Выйти из аккаунта
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import "./scss/Header.scss";

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore()
    let menu = ref<any>(null)
    let panelLogo = ref<any>(null)

    const logout = () => store.dispatch("logout");
    const openPanel = () => {
      menu.value.classList.toggle("menu__active");
      panelLogo.value.classList.toggle("menu__panel-active")
    }

    return {
      logout, openPanel, menu, panelLogo,
      isAuth: computed(() => store.getters.isAuth)
    }
  }
})
</script>
