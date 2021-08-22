<template>
  <div class="auth__form">
    <form @submit.prevent="sendData">
      <div class="auth__registration">
        <input v-model="formData.email" type="text" placeholder="Введите ваш email" />
        <input v-if="!isLogin" v-model="formData.login" type="text" placeholder="Введите ваш логин" />
        <input v-model="formData.password" type="password" placeholder="Введите ваш пароль" />
      </div>
      <button v-if="!isLogin" type="submit" class="home-btn auth-btn">
        Зарегистрироваться
      </button>
      <button v-else type="submit" class="home-btn auth-btn">Войти</button>
      <div v-for="err of errorsList" :key="err" class="auth__errors">
        <p>{{ err }}</p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import "@/components/app/scss/home/Home.scss"
  import { useStore } from "vuex"
  import { defineComponent, ref } from "vue"

  export default defineComponent({
    name: "AuthSection",
    props: {
      isLogin: Boolean,
      errorsList: Array,
    },
    setup(props) {
      const store = useStore()
      const formData = ref({ email: "", password: "", login: "" })
      // let isPassword = reactive(false)

      const sendData = () => {
        if (!props.isLogin) store.dispatch("registration", formData.value)
        else store.dispatch("login", formData.value)
      }

      return { sendData, formData }
    },
  })
</script>
