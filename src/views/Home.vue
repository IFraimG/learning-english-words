<template>
  <div class="main__wrapper">
    <div class="main">
      <div class="main__content">
        <header class="main__preheader">
          <h2>MyOcean English</h2>
        </header>
        <section class="main__title">
          <h1>Учите слова быстро и эффективно!</h1>
        </section>
        <div class="main__form-wrapper">
          <main class="main__form">
            <div ref="leftForm" class="main__form-left">
              <img src="@/assets/bg2.png" alt="">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate nihil ducimus nesciunt, enim rem modi illum sed ipsa possimus earum ipsam quae dolorem quia. Suscipit mollitia distinctio aliquid autem fugit?</p>
            </div>
            <div class="main__form-right">
              <div class="main__tabs">
                <h3 @click="editLogin(false)">Регистрация</h3>
                <h3 @click="editLogin(true)">Вход</h3>
              </div>
              <form class="main__registration main__auth" v-show="!loginInfo" @submit.prevent="sendData">
                <input v-model="formData.login" type="text" placeholder="Введите ваш логин" />
                <input v-model="formData.email" type="text" placeholder="Введите ваш email" />
                <input v-model="formData.password" type="password" placeholder="Введите ваш пароль" />
                <button type="submit" class="profile__run">Зарегистрироваться</button>
              </form>
              <form class="main__login main__auth" v-show="loginInfo" @submit.prevent="sendLogin">
                <input v-model="formData.email" type="text" placeholder="Введите ваш email" />
                <input
                  v-if="!isPassword"
                  v-model="formData.password"
                  type="password"
                  placeholder="Введите ваш пароль"
                />
                <input
                  v-else
                  v-model="formData.password"
                  type="text"
                  placeholder="Введите ваш пароль"
                />
                <p v-if="!isPassword" @click="isPassword = !isPassword">Показать пароль</p>
                <p v-else @click="isPassword = !isPassword">Скрыть пароль</p>
                <button type="submit" class="profile__run">Войти</button>
              </form>
              <div class="main__errors" v-for="err of errorsList" :key="err">
                <p>{{ err }}</p>
              </div>
            </div>
          </main>
        </div>
        <section class="main__cards-list">
          <div class="main__card">
            <img src="@/assets/free.png" alt="free">
            <div class="main__card__text">
              <h3>Личный словарь</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat dolor sapiente, facilis exercitationem blanditiis iste?
              </p>
            </div>
          </div>
          <div class="main__card">
            <img src="@/assets/free.png" alt="free">
            <div class="main__card__text">
              <h3>Бесплатно</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Fugiat dolor sapiente, facilis exercitationem blanditiis iste?
              </p>
            </div>
          </div>
          <div class="main__card">
            <img src="@/assets/free.png" alt="autochecking">
            <div class="main__card__text">
              <h3>Автопроверка</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Fugiat dolor sapiente, facilis exercitationem blanditiis iste?
              </p>
            </div>
          </div>
          <div class="main__card">
            <img src="@/assets/free.png" alt="free">
            <div class="main__card__text">
              <h3>Удобные тесты</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Fugiat dolor sapiente, facilis exercitationem blanditiis iste?
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import "@/components/app/Main.scss"

export default {
  name: "Home",
  data() {
    return {
      formData: {
        email: "",
        password: "",
        login: ""
      },
      isPassword: false
    }
  },
  created() {
    if (this.$options.name == "Home") {
      this.checkTransition()
      window.addEventListener("scroll", this.checkTransition)
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.checkTransition)
  },
  methods: {
    getOffset(el) {
      const rect = el.getBoundingClientRect()
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    },
    sendData() {
      this.$store.dispatch("registration", this.formData)
    },
    sendLogin() {
      this.$store.dispatch("login", this.formData)
    },
    editLogin(isLogin) {
      this.$store.commit('setLogin', isLogin)
    },
    checkTransition() {
      setTimeout(() => {
        let element = this.$refs.leftForm
        let elementHeight = element.offsetHeight

        let offsetFull = this.getOffset(element)
        let offsetTop = offsetFull.top

        let itemPoint = window.innerHeight - elementHeight / 4
        if (elementHeight > window.innerHeight) {
          itemPoint = window.innerHeight - window.innerHeight / 4
        }
        if ((pageYOffset > offsetTop - itemPoint) && pageYOffset < (offsetTop + elementHeight)) {
          this.$refs.leftForm.classList.add("main__form-left-active")
        } else this.$refs.leftForm.classList.remove("main__form-left-active")
      }, 500)
    }
  },
  computed: {
    ...mapGetters(["loginInfo", "errorsList", "isAuth"])
  }
};
</script>
