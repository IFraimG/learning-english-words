<template>
  <div class="theme-switcher__wrapper">
    <label class="theme-switcher">
      <input :checked="theme" class="switcher" type="checkbox" @change="setMode" />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { useStore } from "vuex"

  export default defineComponent({
    name: "ThemeSwitcher",
    setup() {
      const store = useStore()

      const setMode = (event: any) => {
        if (event.target.checked) store.dispatch("setTheme", "dark")
        else store.dispatch("setTheme", "light")
      }

      let theme: any = window.localStorage.getItem("theme")
      if (theme == "dark") theme = true
      else theme = false

      return { setMode, theme }
    },
  })
</script>

<style scoped>
  .theme-switcher {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }

  .theme-switcher__wrapper {
    /* background-color: #fff; */
    width: 90px;
    height: 45px;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(238, 215, 82);
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider::before {
    content: "";
    position: absolute;
    height: 36px;
    width: 36px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  .switcher {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switcher:checked + .slider {
    background-color: #fff;
  }

  .switcher:focus + .slider {
    box-shadow: 0 0 1px #505050;
  }

  .switcher:checked + .slider::before {
    transform: translateX(45px);
    background: url("../../assets/moon.png") 50% / cover no-repeat;
  }

  @media (max-width: 421px) {
    .theme-switcher__wrapper {
      width: 70px;
      height: 35px;
    }
    .slider::before {
      height: 26px;
      width: 26px;
    }
    .switcher:checked + .slider::before {
      transform: translateX(35px);
    }
  }
</style>
