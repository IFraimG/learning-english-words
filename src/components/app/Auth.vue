<template>
  <div class="auth__form">
    <form @submit.prevent="sendData">
      <div class="auth__registration">
        <input
          v-model="formData.email"
          type="text"
          placeholder="Введите ваш email"
        />
        <input
          v-model="formData.login"
          type="text"
          v-if="!isLogin"
          placeholder="Введите ваш логин"
        />
        <input
          v-model="formData.password"
          type="password"
          placeholder="Введите ваш пароль"
        />
      </div>
      <button v-if="!isLogin" type="submit" class="home-btn auth-btn">Зарегистрироваться</button>
      <button v-else type="submit" class="home-btn auth-btn">Войти</button>
      <div class="auth__errors" v-for="err of errorsList" :key="err">
        <p>{{ err }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import "@/components/app/Home.scss"

export default {
  name: "AuthSection",
  data() {
    return {
      formData: {
        email: "",
        password: "",
        login: ""
      },
      isPassword: false
    };
  },
  props: {
    isLogin: Boolean,
    errorsList: Array
  },
  methods: {
    sendData() {
      if (!this.isLogin) this.$store.dispatch("registration", this.formData);
      else this.$store.dispatch("login", this.formData);
    }
  }
};
</script>
