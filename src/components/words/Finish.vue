<template>
  <div class="finish__wrapper">
    <div class="finish">
      <div class="finish__content">
        <div class="finish__header">
          <h1>Вы написали верно {{ complete == null ? 0 : complete.length }} {{ wordsNum }} из {{ len }} {{ wordsNum }}</h1>
          <span v-if="mistakes?.length > 0 && mistakes != null" class="finish__error-title">
            <p @click="isOpen = !isOpen">Было допущено {{ mistakes.length }} {{ errorsNum }}</p>
            <img v-show="!isOpen" src="@/assets/arrow-down.png" alt="" @click="isOpen = true" />
            <img v-show="isOpen" src="@/assets/arrow-top.png" alt="" @click="isOpen = false" />
          </span>
          <div v-if="isOpen" class="finish__error">
            <div v-for="(err, index) of mistakes" :key="index" class="finish__error-list">
              <p>
                <span class="finish__error-index">{{ ++index }}. </span>
                <span class="finish__error-english">{{ err.english }}</span>
                -
                <strike v-if="err.translation != null" class="finish__error-russian"> {{ err.translation }}</strike>
              </p>
            </div>
          </div>
          <div class="finish__footer">
            <router-link :to="{ name: 'Account', params: { id: userID } }">
              <button class="profile__run">Вернуться</button>
            </router-link>
            <button class="profile__run" @click="returnStart">
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
    props: {
      len: Number,
    },
    data() {
      return {
        mistakes: [],
        complete: [],
        isOpen: false,
        activeClass: "finish__error-active",
        userID: null
      }
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
      const complete = JSON.parse(window.sessionStorage.getItem("words"))
      if (complete != null) this.complete = complete
      const mistakes = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
      if (mistakes != null) this.mistakes = mistakes

      this.userID = this.$store.getters.userID
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
