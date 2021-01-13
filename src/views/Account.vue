<template>
  <ModalWords :isModal="isModal" @setModal="setModal" />
  <div class="account">
    <div class="profile">
      <div class="profile__content">
        <img src="@/assets/user.png" />
        <h2>Pushok</h2>
        <p>pushpush@mail.ru</p>
        <button class="profile__run" @click="setModal(true)">Добавить новые слова</button>
      </div>
    </div>
    <div class="list">
      <div class="list__content" v-for="(wordsArray, index) of currentWords" :key="index">
        <div class="list__info" @click="runWords(index)">
          <div class="list__title">
            <h3>Ваши последние ENGLISH WORDS</h3>
            <button @click.stop="isModal = false" class="profile__run">Обновить</button>
          </div>
          <div class="list__words" v-for="(words, index) of wordsArray" :key="index">
            <p class="list__item">
              <span class="list__english">{{ words.english }}</span>
              -
              <span class="list__russian">{{ words.russian }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalWords from '../components/account/ModalWords.vue';
import { mapGetters } from "vuex"

export default {
  name: "Account",
  components: { ModalWords },
  data() {
    return {
      isModal: false
    }
  },
  created() {
    this.$store.dispatch("getWords", this.userID)
    console.log(this.currentWords);
  },
  computed: {
    ...mapGetters(["userID", "currentWords"])
  },
  methods: {
    setModal(isModal) {
      this.isModal = isModal;
    },
    runWords(wordsIndex) {
      this.$router.push(`/words/${this.userID}/${wordsIndex}/?type=start`)
    }
  }
};
</script>

<style lang="scss">
.account {
  padding: 0 20px;
  gap: 50px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  font-family: "Helvetica";
}
.profile {
  width: 400px;
  padding: 20px 0;
  // border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 30px 0 #dddddd;
  border-radius: 50px 20px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #222831;
    color: #fff;
  }
  &__content {
    margin: 0 20px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 86px;
      height: 86px;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 50%;
    }
    p {
      margin: 20px 0;
    }
  }
  &__run {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 3px;
    border: none;
    color: #fff;
    font-weight: 500;
    background-color: #f05454;
    &:active {
      background-color: #a33b3b;
    }
    &:focus {
      outline: none;
    }
  }
}
.list {
  max-width: 600px;
  &__content {
  }
  &__info {
    box-shadow: 0 0 30px 0 #dddddd;
    padding: 20px 50px;
    margin-bottom: 50px;
    user-select: none;
    cursor: pointer;
    transition: transform 0.5s ease-in-out, background 0.2s ease-in-out;
    &:hover {
      transform: translateY(-20px);
    }
    &:active {
      background: #dadada;
    }
  }
  &__words {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
  }
  &__title {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px 0;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding-bottom: 20px;
    margin-bottom: 20px;
    h3 {
      margin-right: 20px;
    }
  }
  &__english {
    color: #f05454;
  }
}
</style>