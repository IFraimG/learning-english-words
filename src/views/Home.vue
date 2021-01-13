<template>
  <div class="home">
    <div>
      <div>
        <div>
          <h1 @click="editLogin(false)">Регистрация</h1>
          <h1 @click="editLogin(true)">Вход</h1>
        </div>
        <form v-show="!loginInfo" @submit.prevent="sendData">
          <input v-model="formData.login" type="text" placeholder="Введите ваш логин" />
          <input v-model="formData.email" type="text" placeholder="Введите ваш email" />
          <input v-model="formData.password" type="password" placeholder="Введите ваш пароль" />
          <button type="submit">Зарегистрироваться</button>
        </form>
        <form v-show="loginInfo" @submit.prevent="sendLogin">
          <input v-model="formData.email" type="text" placeholder="rfedw" />
          <input v-model="formData.password" type="password" />
          <button type="submit">Войти</button>
        </form>
        <div v-for="err of errorsList" :key="err">
          <p>{{err}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

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
