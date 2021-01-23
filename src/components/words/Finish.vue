<template>
  <div class="finish__wrapper">
    <div class="finish">
      <div class="finish__content">
        <div class="finish__header">
          <h1>Вы написали верно {{ complete == null ? 0 : complete.length }} {{ wordsNum }} из {{ len }} {{ wordsNum }}</h1>
          <span v-if="mistakes?.length > 0 && mistakes != null" class="finish__error-title">
            <p @click="isOpen = !isOpen">Было допущено {{ mistakes.length }} {{ errorsNum }}</p>
            <img v-show="!isOpen" @click="isOpen = true" src="@/assets/arrow-down.png" alt="">
            <img v-show="isOpen" @click="isOpen = false" src="@/assets/arrow-top.png" alt="">
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
            <router-link :to="{name: 'Account'}">
              <button class="profile__run">Вернуться</button>
            </router-link>
            <button @click="returnStart" class="profile__run">Пройти еще раз</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Finish",
  data() {
    return {
      mistakes: [],
      complete: [],
      isOpen: false,
      activeClass: "finish__error-active"
    }
  },
  props: {
    len: Number
  },
  computed: {
    errorsNum() {
      if (this.mistakes.length == 1 || this.mistakes % 10 == 1) return "ошибка";
      else if (this.mistakes.length > 1 && this.mistakes.length < 5) return "ошибки";
      else return "ошибок";
    },
    wordsNum() {
      if (this.complete.length > 0 && this.complete.length < 5) return "слова";
      else return "слов";
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.finish {
  width: 800px;
  font-family: "Helvetica";
  margin: 100px 20px;
  &__wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
  }
  &__header {
    text-align: center;
    h1 {
      margin-bottom: 30px;
      color: rgb(55, 157, 52);
      font-size: 42px;
      @media (max-width: 471px) {
        font-size: 32px;
      }
    }
    p {
      font-size: 24px;
      color: #c73636;
      @media (max-width: 471px) {
        font-size: 24px;
      }
    }
  }
  &__content {
    display: flex;
    justify-content: center;
    max-width: 100%;
  }
  &__error {
    margin-top: 30px;
    border: 1px solid #c73636;
    &-title {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
      p {
        &:hover {
          border-bottom: 1px solid #c73636;
        }
      }
      img {
        margin-left: 20px;
        min-width: 32px;
        min-height: 32px;
        max-width: 32px;
        max-height: 32px;
      }
    }
    &-list {
      margin: 30px 0;
    }
    &-index {
      color: #000;
    }
    &-english {
      color: #000;
    }
  }
  &__footer {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>