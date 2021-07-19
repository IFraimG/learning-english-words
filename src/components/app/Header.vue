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
      <div @click="openPanel" class="menu__panel">
        <img src="@/assets/menu.png" alt="" />
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
import { computed, defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import "./scss/Header.scss";

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore()
    let isHeader = reactive<any>(false)
    let menu = ref<any>(null)

    const logout = () => store.dispatch("logout");
    const openPanel = () => {
      isHeader = !isHeader;
      if (isHeader) menu.value.classList.add("menu__active");
      else menu.value.classList.remove("menu__active");
    }

    return { logout, openPanel, menu, isHeader, isAuth: computed(() => store.getters.isAuth) }
  }
})
</script>
