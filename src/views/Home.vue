<template>
  <div class="main__wrapper">
    <div class="main">
      <div class="main__content">
        <div class="main__form">
          <div class="main__form-left">
            <img src="@/assets/bg1.png" alt="">
          </div>
          <div class="main__form-right">
            <div class="main__tabs">
              <h1 @click="editLogin(false)">Регистрация</h1>
              <h1 @click="editLogin(true)">Вход</h1>
            </div>
            <div class="main__form-center">
              <form class="main__registration main__auth" v-show="!loginInfo" @submit.prevent="sendData">
                <input v-model="formData.login" type="text" placeholder="Введите ваш логин" />
                <input v-model="formData.email" type="text" placeholder="Введите ваш email" />
                <input v-model="formData.password" type="password" placeholder="Введите ваш пароль" />
                <button type="submit" class="profile__run">Зарегистрироваться</button>
              </form>
              <form class="main__login main__auth" v-show="loginInfo" @submit.prevent="sendLogin">
                <input v-model="formData.email" type="text" placeholder="Введите вашу электронную почту" />
                <input v-model="formData.password" type="password" placeholder="Введите ваш пароль" />
                <button type="submit" class="profile__run">Войти</button>
              </form>
            </div>
            <div class="main__errors" v-for="err of errorsList" :key="err">
              <p>{{err}}</p>
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
  // beforeUpdate() {
  //   console.log(this.$store.getters.isAuth);
  //   if (this.isAuth) this.$router.go(-1)
  // },
  methods: {
    sendData() {
      this.$store.dispatch("registration", this.formData)
    },
    sendLogin() {
      this.$store.dispatch("login", this.formData)
    },
    editLogin(isLogin) {
      this.$store.commit('setLogin', isLogin)
    }
  },
  computed: {
    ...mapGetters(["loginInfo", "errorsList", "isAuth"])
  }
};
</script>
