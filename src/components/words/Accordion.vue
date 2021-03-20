<template>
  <div class="accordion__wrapper">
    <div class="accordion">
      <div class="accordion__content">
        <div class="accordion__header">
          <h1>Гармошка</h1>
        </div>
        <div v-if="!isRotate" class="accordion__form">
          <div
            class="accordion__item"
            v-for="(words, index) of currentSortWords"
            :key="index"
          >
            <label :for="'inputElement' + index">{{ words.russian }} - </label>
            <input
              :ref="'inputInfo' + index"
              type="text"
              :id="'inputElement' + index"
            />
            <button
              v-if="!doneWords.includes(words.english)"
              @click="checkWord(words.english, index)"
            >
              <img src="@/assets/check.png" />
            </button>
            <img
              v-if="doneWords.includes(words.english)"
              src="@/assets/success.png"
            />
            <p
              v-if="errorWords.includes(words.english)"
              class="accordion__error"
            >
              Неверно!
            </p>
            <p
              v-if="
                errorWords.includes(words.english) &&
                  !isAnswer.includes(words.english)
              "
              @click="addAnswer(words.english)"
              class="accordion__answer"
            >
              ответ
            </p>
            <p
              v-if="isAnswer.includes(words.english)"
              class="accordion__answer"
            >
              {{ words.english }}
              <img
                @click="deleteAnswer(words.english)"
                src="@/assets/close.png"
                alt=""
              />
            </p>
          </div>
        </div>
        <div class="accordion__form" v-else>
          <div
            class="accordion__item"
            v-for="(words, index) of currentSortWords"
            :key="index"
          >
            <label :for="'inputElement' + index">{{ words.english }} - </label>
            <input
              :ref="'inputInfo' + index"
              type="text"
              :id="'inputElement' + index"
            />
            <button
              v-if="!doneWords.includes(words.russian)"
              @click="checkWord(words.russian, index)"
            >
              <img src="@/assets/check.png" />
            </button>
            <img
              v-if="doneWords.includes(words.russian)"
              src="@/assets/success.png"
            />
            <p
              v-if="errorWords.includes(words.russian)"
              class="accordion__error"
            >
              Неверно!
            </p>
            <p
              v-if="
                errorWords.includes(words.russian) &&
                  !isAnswer.includes(words.russian)
              "
              @click="addAnswer(words.russian)"
              class="accordion__answer"
            >
              ответ
            </p>
            <p
              v-if="isAnswer.includes(words.russian)"
              class="accordion__answer"
            >
              {{ words.russian }}
              <img
                @click="deleteAnswer(words.russian)"
                src="@/assets/close.png"
                alt=""
              />
            </p>
          </div>
        </div>
        <div class="accordion__footer">
          <button @click="rotateWords" class="accordion__send profile__run">
            Перевернуть гармошку
          </button>
          <router-link :to="{ name: 'Account' }">
            <button @click="rotateWords" class="accordion__send profile__run">
              Завершить
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./scss/Accordion.scss";

export default {
  name: "Accordion",
  data() {
    return {
      currentInputWord: "",
      doneWords: [],
      errorWords: [],
      isAnswer: [],
      checkedAnswers: [],
      isRotate: false
    };
  },
  props: {
    currentWords: Array
  },
  computed: {
    currentSortWords() {
      let currentWords = this.currentWords;
      return currentWords.sort(() => Math.random() - 0.5).reverse();
    }
  },
  methods: {
    addAnswer(words) {
      this.isAnswer.push(words);
    },
    deleteAnswer(words) {
      let isIndex = this.isAnswer.findIndex(item => item == words);
      if (isIndex != -1) this.isAnswer.splice(isIndex, 1);
    },
    checkWord(word, index) {
      let value = this.$refs["inputInfo" + index.toString()].value;
      if (
        word ==
        value
          .trimLeft()
          .trimRight()
          .toLowerCase()
      ) {
        this.$refs["inputInfo" + index.toString()].disabled = true;
        let indexError = this.errorWords.indexOf(word);
        if (indexError != -1) this.errorWords.splice(indexError, 1);
        this.deleteAnswer(word);
        this.doneWords.push(word);
      } else {
        let indexError = this.errorWords.indexOf(word);
        if (indexError == -1) this.errorWords.push(word);
      }
    },
    sendData() {
      let arrayWords = JSON.parse(window.sessionStorage.getItem("words"));
      if (arrayWords != null) window.sessionStorage.removeItem("words");

      let errorWords = JSON.parse(
        window.sessionStorage.getItem("wordsMistakes")
      );
      if (errorWords != null) window.sessionStorage.removeItem("wordsMistakes");

      let successWords = [];
      let failedWords = [];

      this.doneWords.map(item => {
        this.currentWords.map(wordInfo => {
          if (wordInfo.english == item)
            successWords.push({ english: wordInfo.russian, id: wordInfo.id });
        });
      });
      this.errorWords.map(item => {
        this.currentWords.map(wordInfo => {
          if (wordInfo.english == item)
            failedWords.push({ english: item, id: wordInfo.id });
        });
      });
      window.sessionStorage.setItem("words", JSON.stringify(successWords));
      window.sessionStorage.setItem(
        "wordsMistakes",
        JSON.stringify(failedWords)
      );
      // this.$emit('setFinishType')
    },
    rotateWords() {
      this.doneWords = [];
      this.errorWords = [];
      this.isAnswer = [];
      this.isRotate = !this.isRotate;
    }
  }
};
</script>
