<template>
  <div class="home__wrapper">
    <div class="home__container">
      <div class="home__content">
        <header class="home__header home-header">
          <div class="home-header__item home-header__logo">
            <img src="@/assets/logofone.png" />
            <h3>MyOcean<span>English</span></h3>
          </div>
          <ul class="home-header__list">
            <li class="home-header__item" @click="scrollAuth">
              <p>Авторизоваться</p>
            </li>
            <li class="home-header__item">
              <router-link to="#">
                <p>About us</p>
              </router-link>
            </li>
            <li class="home-header__item">
              <router-link to="#">
                <p>Services</p>
              </router-link>
            </li>
            <li class="home-header__item">
              <router-link to="#">
                <p>Blog</p>
              </router-link>
            </li>
            <li class="home-header__item">
              <button class="home-btn" @click="scrollAuth">Get started</button>
            </li>
          </ul>
        </header>
        <main class="home-main home__main">
          <div class="home-main__particles">
            <img src="@/assets/Polygon2.png" alt="">
            <img src="@/assets/Rectangle4.png" alt="">
            <img src="@/assets/Polygon3.png" alt="">
          </div>
          <div class="home-main__left">
            <h1>SEO & Digital <span>Marketing</span> For Your Website.</h1>
            <p>Provide all kind of seo services and help to improve seo ranking. Globally incubate standards.</p>
            <div class="home-main__down">
              <button class="home-btn" @click="scrollAuth">Get started</button>
              <p>Watch video</p>
            </div>
          </div>
          <div class="home-main__right">
            <img src="@/assets/homefone1.png" alt="">
          </div>
        </main>
      </div>
    </div>
    <section class="home-pictures home__pictures">
      <div v-for="(img, index) of logoList" :key="index">
        <img :src="img" alt="logo">
      </div>
    </section>
    <SliderHome />
    <div class="home__container">
      <div class="auth home-auth" ref="authContent" id="authContent">
        <div class="auth__left">
          <div class="auth__tabs">
            <h3 @click="editLogin(false)">Регистрация</h3>
            <span> / </span>
            <h3 @click="editLogin(true)">Вход</h3>
          </div>
          <AuthSection :isLogin="loginInfo" :errorsList="errorsList" />
        </div>
        <div class="auth__right">
          <img src="@/assets/fone9.png" alt="">
        </div>
      </div>
      <section class="home-cards home__cards">
        <div class="home-cards__item" v-for="(item, index) of cardsList" :key="index">
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
import { defineComponent } from "@vue/runtime-core"
import "@/components/app/scss/Home.scss"
import { mapGetters } from 'vuex';
import SliderHome from "./SliderHome.vue"
import AuthSection from "./Auth.vue"
import Footer from "./Footer.vue"
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

let Component = defineComponent({
  name: "HomeContent",
  components: { SliderHome, AuthSection, Footer },
  data() {
    return {
      logoList: [logo1, logo2, logo3, logo4, logo5, logo6],
      cardsList: [
        { title: "Личный словарь", link: "/", img: vector1, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dolor sapiente, facilis exercitationem blanditiis iste?" },
        { title: "Личный словарь2", link: "/", img: vector2, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dolor sapiente, facilis exercitationem blanditiis iste?" },
        { title: "Личный словарь3", link: "/", img: vector3, text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dolor sapiente, facilis exercitationem blanditiis iste?" }
      ]
    }
  },
  methods: {
    editLogin(isLogin: boolean) {
      this.$store.commit("setLogin", isLogin);
    },
    scrollAuth() {
      // @ts-ignore
      let info: any = this.$refs.authContent.offsetTop
      window.scrollBy({ top: info, behavior: "smooth" })
    }
  },
  computed: {
    ...mapGetters(["loginInfo", "errorsList", "isAuth"])
  }
})

export default Component
</script>
