<template>
  <div class="finish__wrapper">
    <div class="finish">
      <div class="finish__content">
        <div class="finish__header">
          <h1>Вы написали верно {{ complete.length }} слова из {{ len }} слов</h1>
          <span class="finish__error-title">
            <p @click="isOpen = !isOpen">Было допущено {{ mistakes.length }} ошибки</p>
            <img v-show="!isOpen" @click="isOpen = true" src="@/assets/arrow-down.png" alt="">
            <img v-show="isOpen" @click="isOpen = false" src="@/assets/arrow-top.png" alt="">
          </span>
          <div v-if="isOpen" class="finish__error">
            <div class="finish__error-list" v-for="(err, index) of mistakes" :key="index">
              <p>
                <span class="finish__error-index">{{ ++index }}. </span>
                <span class="finish__error-english">{{ err.english }}</span>
                - 
                <strike class="finish__error-russian">{{ err.translation }}</strike>
              </p>
            </div>
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
      mistakes: null,
      complete: null,
      isOpen: false,
      activeClass: "finish__error-active"
    }
  },
  props: {
    len: Number
  },
  created() {
    this.complete = JSON.parse(window.sessionStorage.getItem("words"))
    this.mistakes = JSON.parse(window.sessionStorage.getItem("wordsMistakes"))
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
}
</style>