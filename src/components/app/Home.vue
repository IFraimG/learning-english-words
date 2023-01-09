<template>
  <div class="home__wrapper">
    <div class="home__container">
      <div class="home__content">
        <header class="home__header home-header">
          <div class="home-header__item home-header__logo">
            <img src="@/assets/logo1234.png" />
            <h3>Океан<span>Слов</span></h3>
          </div>
          <ul class="home-header__list">
            <li class="home-header__item" @click="scrollAuth">
              <p>Авторизоваться</p>
            </li>
            <li class="home-header__switch">
              <ThemeSwitcher />
            </li>
          </ul>
        </header>
        <main class="home-main home__main">
          <div class="home-main__particles">
            <img src="@/assets/Polygon2.png" alt="" />
            <img src="@/assets/Rectangle4.png" alt="" />
            <img src="@/assets/Polygon3.png" alt="" />
          </div>
          <div class="home-main__left">
            <h1>Не обращай & внимания <span>внимания</span> на текст.</h1>
            <p>Он здесь для красоты... И логотипы тоже......</p>
            <div class="home-main__down">
              <button class="home-btn" @click="scrollAuth">Get started</button>
              <p>Watch video</p>
            </div>
          </div>
          <div class="home-main__right">
            <img src="@/assets/homefone1.png" alt="" />
          </div>
        </main>
      </div>
    </div>
    <section class="home-pictures home__pictures">
      <div v-for="(img, index) of logoList" :key="index">
        <img :src="img" alt="logo" />
      </div>
    </section>
    <SliderHome />
    <div class="home__container">
      <div id="authContent" ref="authContent" class="auth home-auth">
        <div class="auth__left">
          <div class="auth__tabs">
            <h3 @click="editLogin(false)">Регистрация</h3>
            <span> / </span>
            <h3 @click="editLogin(true)">Вход</h3>
          </div>
          <AuthSection :is-login="loginInfo" :errors-list="errorsList" />
        </div>
        <div class="auth__right">
          <img src="@/assets/fone9.png" alt="" />
        </div>
      </div>
      <section class="home-cards home__cards">
        <div v-for="(item, index) of cardsList" :key="index" class="home-cards__item">
          <img :src="item.img" alt="free" />
          <div class="home-cards__text">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
            <router-link :to="item.link">
              <span>Read more....</span>
            </router-link>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue"
  import "@/components/app/scss/home/Home.scss"
  import { useStore } from "vuex"
  import SliderHome from "./SliderHome.vue"
  import AuthSection from "./Auth.vue"
  import Footer from "./Footer.vue"
  import ThemeSwitcher from "./ThemeSwitcher.vue"

  // @ts-ignore
  import logo1 from "@/assets/logo1.png"
  // @ts-ignore
  import logo2 from "@/assets/logo2.png"
  // @ts-ignore
  import logo3 from "@/assets/logo3.png"
  // @ts-ignore
  import logo4 from "@/assets/logo4.png"
  // @ts-ignore
  import logo5 from "@/assets/logo5.png"
  // @ts-ignore
  import logo6 from "@/assets/logo6.png"
  // @ts-ignore
  import vector1 from "@/assets/Vector.png"
  // @ts-ignore
  import vector2 from "@/assets/Vector(1).png"
  // @ts-ignore
  import vector3 from "@/assets/Vector(2).png"

  export default defineComponent({
    name: "HomeContent",
    components: { SliderHome, AuthSection, Footer, ThemeSwitcher },
    setup() {
      const store = useStore()

      const logoList = [logo1, logo2, logo3, logo4, logo5, logo6]
      const cardsList = [
        { title: "Личный словарь", link: "/", img: vector1, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dolor sapiente, facilis exercitationem blanditiis iste?" },
        { title: "Бесплатно", link: "/", img: vector2, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dolor sapiente, facilis exercitationem blanditiis iste?" },
        { title: "Нет рекламы", link: "/", img: vector3, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dolor sapiente, facilis exercitationem blanditiis iste?" },
      ]

      const loginInfo = computed(() => store.getters.loginInfo)
      const errorsList = computed(() => store.getters.errorsList)
      const isAuth = computed(() => store.getters.isAuth)
      const authContent = ref(null)

      const editLogin = (isLogin: boolean) => store.commit("setLogin", isLogin)

      const scrollAuth = () => {
        // @ts-ignore
        window.scroll({ top: authContent.value.offsetTop, behavior: "smooth" })
      }

      return {
        logoList, cardsList, loginInfo, authContent,
        errorsList, isAuth, editLogin, scrollAuth
      }
    }
  })
</script>
