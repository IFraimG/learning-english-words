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
import "@/components/app/scss/Home.scss"
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  name: "AuthSection",
  props: {
    isLogin: Boolean,
    errorsList: Array
  },
  setup(props) {
    const store = useStore()
    let formData = ref({ email: "", password: "", login: "" })
    // let isPassword = reactive(false)

    const sendData = () => {
      if (!props.isLogin) store.dispatch("registration", formData.value);
      else store.dispatch("login", formData.value);
    }

    return { sendData, formData }
  }
};
</script>
