<template>
  <div class="finish__wrapper">
    <div class="finish">
      <div class="finish__content">
        <div class="finish__header">
          <h1>Вы написали верно {{ complete == null ? 0 : complete.length }} {{ wordsNum }} из {{ len }} {{ wordsNum }}</h1>
          <span v-if="mistakes?.length > 0 && mistakes != null" class="finish__error-title">
            <p @click="isOpen = !isOpen">Было допущено {{ mistakes.length }} {{ errorsNum }}</p>
            <img v-show="!isOpen" @click="isOpen = true" src="@/assets/arrow-down.png" alt="" />
            <img v-show="isOpen" @click="isOpen = false" src="@/assets/arrow-top.png" alt="" />
          </span>
          <div v-if="isOpen" class="finish__error">
            <div class="finish__error-list" v-for="(err, index) of mistakes" :key="index">
              <p>
                <span class="finish__error-index">{{ ++index }}. </span>
                <span class="finish__error-english">{{ err.english }}</span>
                -
                <strike class="finish__error-russian" v-if="err.translation != null"> {{ err.translation }}</strike>
              </p>
            </div>
          </div>
          <div class="finish__footer">
            <router-link :to="{ name: 'Account' }">
              <button class="profile__run">Вернуться</button>
            </router-link>
            <button @click="returnStart" class="profile__run">
              Пройти еще раз
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "./scss/englishv/Finish.scss"

  export default {
    name: "Finish",
    data() {
      return {
        mistakes: [],
        complete: [],
        isOpen: false,
        activeClass: "finish__error-active",
      }
    },
    props: {
      len: Number,
    },
    computed: {
      errorsNum() {
        if (this.mistakes.length == 1 || this.mistakes % 10 == 1) return "ошибка"
        else if (this.mistakes.length > 1 && this.mistakes.length < 5) return "ошибки"
        else return "ошибок"
      },
      wordsNum() {
        if (this.complete.length > 0 && this.complete.length < 5) return "слова"
        else return "слов"
      },
    },
    created() {
      let complete = JSON.parse(window.sessionStorage.getItem("words"))
      if (complete != null) this.complete = complete
      let mistakes = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
      if (mistakes != null) this.mistakes = mistakes
    },
    methods: {
      returnStart() {
        window.sessionStorage.removeItem("words")
        window.sessionStorage.removeItem("wordsMistakes")
        this.$router.push(`/words/${this.$route.params.userid}/0/?type=englishV&task=1`)
      },
    },
  }
</script>
