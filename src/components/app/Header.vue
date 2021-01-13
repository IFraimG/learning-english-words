<template>
  <header class="header">
    <div class="header__content">
      <div class="header__left">
        <h1>MyOcean English-Project</h1>
      </div>
      <div class="header__right">
        <router-link class="header-link" to="/account">Профиль</router-link>
        <p class="header-link" v-if="$store.getters.isAuth" @click="logout">Выйти из аккаунта</p>
      </div>
      <div @click="openPanel" class="menu__panel"></div>
      <div class="menu" ref="menu">
        <div class="menu__content">
          <router-link class="header-link menu-link" to="/account">Профиль</router-link>
          <p class="header-link menu-link" v-if="$store.getters.isAuth" @click="logout">Выйти из аккаунта</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    openPanel() {
      this.$refs.menu.classList.add("menu__active")
    }
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.header {
  height: 60px;
  width: 100%;
  position: sticky;
  background-color: #fff;
  left: 0;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15);
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    @media (max-width: 574px) {
      justify-content: space-between;
    }
  }
  &__left {
    h1 {
      font-family: "Verdana";
      font-weight: normal;
      @media (max-width: 1034px) {
        font-size: 24px;
      }
      @media (max-width: 801px) {
        font-size: 18px;
      }
      @media (max-width: 574px) {
        margin-left: 20px;
      }
      @media (max-width: 337px) {
        margin-left: 20px;
      }
    }
  }
  &__right {
    display: flex;
    @media (max-width: 574px) {
      display: none;
    }
  }
  &-link {
    padding-bottom: 5px;
    margin-left: 40px;
    letter-spacing: 1px;
    color: #000;
    text-decoration: none;
    font-weight: bold;
    font-family: "Verdana";
    white-space: nowrap;
    position: relative;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 2px;
      background: #000;
      bottom: 0;
      right: 0;
      left: 0;
      transition: all 0.5s;
    }
    &:hover {
      &:after {
        width: 100%;
      }
    }
    @media (max-width: 851px) {
      font-size: 14px;
      margin-left: 20px;
    }
  }
}

.menu {
  display: none;
  position: fixed;
  right: 0;
  top: -120px;
  transition: 1s ease-in-out;
  @media (max-width: 674px) {
    display: block;
  }
  &__content {
    background-color: #222831;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0 0 0 20px;
  }
  &-link {
    color: #dddddd;
    margin-top: 10px;
    margin-right: 10px;
     &::after {
      content: "";
      background: #fff;
    }
    &:last-child {
      margin-bottom: 10px;
    }
  }
  &__panel {
    display: none;
    width: 64px;
    height: 64px;
    background: #000;
    @media (max-width: 574px) {
      display: block;
    }
  }
  &__active {
    top: 60px;
  }
}
</style>