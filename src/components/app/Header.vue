<template>
  <header v-if="$store.getters.isAuth" class="header">
    <div class="header__content">
      <div class="header__left">
        <h1>MyOcean English-Project</h1>
      </div>
      <div class="header__right">
        <router-link class="header-link" to="/account">Профиль</router-link>
        <router-link class="header-link" to="/dictionary">Словарь</router-link>
        <p class="header-link" @click="logout">Выйти из аккаунта</p>
      </div>
      <div @click="openPanel" class="menu__panel">
        <img src="@/assets/menu.png" alt="" />
      </div>
      <div class="menu" ref="menu">
        <div class="menu__content">
          <router-link class="header-link menu-link" to="/account"
            >Профиль</router-link
          >
          <router-link class="header-link menu-link" to="/dictionary?column=1"
            >Словарь</router-link
          >
          <p
            class="header-link menu-link"
            v-if="$store.getters.isAuth"
            @click="logout"
          >
            Выйти из аккаунта
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import "./Header.scss";

export default {
  name: "Header",
  data() {
    return {
      isHeader: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    openPanel() {
      this.isHeader = !this.isHeader;
      if (this.isHeader) this.$refs.menu.classList.add("menu__active");
      else this.$refs.menu.classList.remove("menu__active");
    }
  }
};
</script>
