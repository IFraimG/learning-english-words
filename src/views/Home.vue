<template>
  <div @mousemove="checkTransition" class="main__wrapper">
    <div class="main">
      <div class="main__content">
        <div class="main__preheader"></div>
        <div class="main__form-wrapper">
          <div class="main__form">
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
                <input v-model="formData.password" type="password" placeholder="Введите ваш пароль" />
                <button type="submit" class="profile__run">Войти</button>
              </form>
              <div class="main__errors" v-for="err of errorsList" :key="err">
                <p>{{ err }}</p>
              </div>
            </div>
          </div>
        </div>
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
    }
  },
  methods: {
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
      this.$refs.leftForm.classList.add("main__form-left-active")
    }
  },
  computed: {
    ...mapGetters(["loginInfo", "errorsList", "isAuth"])
  }
};
</script>
