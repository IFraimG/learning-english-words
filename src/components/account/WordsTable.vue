<template>
  <div
    class="list__info"
    ref="listWords"
    @mousedown="setPanel"
    @contextmenu.prevent="$emit('setOpenPanel', index)"
    @click="runWords(wordsArray.title)"
  >
    <div
      ref="panel"
      @mousedown.stop
      @click.stop
      v-if="isOpenPanel == index && !editMode"
      class="list__panel"
    >
      <ul class="list__panel-content">
        <li class="list__panel-item" @click.stop="editWords(wordsArray.words, wordsArray.title)">Изменить</li>
        <li class="list__panel-item">
          <router-link :to="'/account/setupfolder?title=' + wordsArray.title">
            Добавить в раздел
          </router-link>
        </li>
        <li class="list__panel-item" @click="openModal">Новые слова</li>
        <li class="list__panel-item" @click="$emit('setOpenPanel', -1)">
          <router-link :to="'/account/delete?title=' + wordsArray.title">
            Удалить
          </router-link>
        </li>
        <li class="list__panel-item" @click="$emit('setOpenPanel', -1)">Отмена</li>
      </ul>
    </div>
    <div class="list__title">
      <h3>{{ wordsArray.title }}</h3>
      <button v-if="editMode" class="profile__run">
        <router-link :to="'/account/delete?title=' + wordsArray.title">Удалить</router-link>
      </button>
      <button
        v-if="editMode != wordsArray.title"
        @click.stop="editWords(wordsArray.words, wordsArray.title)"
        class="profile__run"
      >
        Редактировать
      </button>
      <button v-else @click.stop="stopEdit" class="profile__run">Отменить</button>
    </div>
    <div
      class="list__words"
      v-for="(words, index) of wordsArray.words"
      :key="index"
    >
      <p v-if="editMode != wordsArray.title" class="list__item">
        <span class="list__english">{{ words.english }}</span>
        -
        <span class="list__russian">{{ words.russian }}</span>
      </p>
      <account-word
        v-else
        :wordData="editList[index]"
        :title="wordsArray.title"
        :index="index"
        @saveWord="saveWord"
      />
    </div>
    <div @click.stop class="list__footer" v-if="editMode == wordsArray.title">
      <button
        @click="saveEditWords(wordsArray.title, wordsArray.id)"
        class="profile__run"
      >
        Сохранить
      </button>
      <button @click="openModal" class="profile__run">
        Новые слова
      </button>
      <button class="profile__run">
        <router-link :to="'/account/setupfolder?title=' + wordsArray.title">
          Добавить в раздел
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "@/components/account/scss/Account.scss";
import AccountWord from "@/components/account/AccountWord.vue";
import { nextTick } from 'vue';

export default {
  name: "WordsTable",
  components: { AccountWord },
  props: {
    wordsArray: Object,
    index: Number,
    isOpenPanel: Number
  },
  emits: ["setOpenPanel"],
  data() {
    return {
      editMode: false,
      editList: [],
      section: null
    };
  },
  computed: {
    reverseWords() {
      let newArray = [];
      for (let i = this.currentWords.length - 1; i >= 0; i--) {
        newArray.push(this.currentWords[i]);
      }
      return newArray;
    },
    ...mapGetters(["userID", "currentWords", "isLoader", "profile"])
  },
  methods: {
    runWords(title) {
      if (this.editMode != title) {
        let index = this.currentWords.findIndex(
          wordsArray => title == wordsArray.title
        );
        this.$router.push(`/words/${this.userID}/${index}/?type=start`);
      }
    },
    editWords(words, title) {
      this.editMode = title;
      this.editList = [...words];
    },
    stopEdit() {
      this.editList = [];
      this.editMode = false;
    },
    saveWord(data) {
      this.editList[data.index] = data.word;
    },
    async saveEditWords(title, id) {
      let index = this.currentWords.findIndex(wordList => title == wordList.title);
      await this.$store.dispatch("sendEditWords", {
        title,
        id,
        editWords: this.editList,
        userid: this.userID,
        wordsid: index
      });
      this.stopEdit();
      nextTick(() => window.scrollTo({ top: 0, behavior: "smooth" }))
    },
    openModal() {
      this.$store.commit("SET_MODAL_WORDS", { title: this.wordsArray.title, list: this.wordsArray.words })
      this.$router.push("/account/words")
    }
  }
};
</script>
