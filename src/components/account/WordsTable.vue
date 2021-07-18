<template>
  <Modal v-if="deleteModal" @onsuccess="successDelete">
    <template #title>
      <p>Удаление раздела MODULE 6E</p>
    </template>
    <template #content>
      <h2>Вы уверены, что хотите его удалить?</h2>
    </template>
    <template #acceptButton>Удалить</template>
  </Modal>
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
        <li class="list__panel-item" @click="setModalSection">Добавить в раздел</li>
        <li class="list__panel-item" @click="openModal">Новые слова</li>
        <li class="list__panel-item" @click.stop="modalDelete(true)">Удалить</li>
        <li class="list__panel-item" @click="$emit('setOpenPanel', -1)">Отмена</li>
      </ul>
    </div>
    <div class="list__title">
      <h3>{{ wordsArray.title }}</h3>
      <button v-if="editMode" class="profile__run" @click.stop="modalDelete(true)">
        Удалить
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
      <button @click="openModal" class="profile__run">Новые слова</button>
      <button @click="setModalSection" class="profile__run">Добавить в раздел</button>
    </div>
  </div>
  <Modal v-if="modalSections" @onsuccess="sendSection">
    <template #title>
      <p>Добавление слов</p>
    </template>
    <template #content>
      <DropList @setItem="saveSection" v-if="shortFolders != null" :list="shortFolders" />
      <div class="profile__nosections" v-else>
        <p>Вы еще не создали ни один раздел</p>
        <CreateFolder class="profile__nosections-create" />
      </div>
    </template>
    <template #acceptButton>Добавить</template>
  </Modal>
</template>

<script>
import { mapGetters } from "vuex";
import "@/components/account/scss/Account.scss";
import AccountWord from "@/components/account/AccountWord.vue";
import Modal from "../app/Modal.vue";
import DropList from '../app/DropList.vue';
import CreateFolder from '../folders/CreateFolder.vue';

export default {
  name: "WordsTable",
  components: { AccountWord, Modal, DropList, CreateFolder },
  props: {
    wordsArray: Object,
    index: Number,
    isOpenPanel: Number
  },
  data() {
    return {
      editMode: false,
      editList: [],
      section: null
    };
  },
  emits: ["setOpenPanel"],
  computed: {
    reverseWords() {
      let newArray = [];
      for (let i = this.currentWords.length - 1; i >= 0; i--) {
        newArray.push(this.currentWords[i]);
      }
      return newArray;
    },
    ...mapGetters([
      "userID",
      "currentWords",
      "isLoader",
      "profile",
      "deleteModal",
      "modalSections",
      "folders",
      "shortFolders"
    ])
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
    async deleteWords(title) {
      let index = this.currentWords.findIndex(
        wordList => title == wordList.title
      );
      await this.$store.dispatch("deleteWords", {
        title,
        index,
        wordsFull: this.currentWords,
        userID: this.userID,
        email: this.profile.email,
        login: this.profile.login
      });
      window.location.reload();
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
      let index = this.currentWords.findIndex(
        wordList => title == wordList.title
      );
      await this.$store.dispatch("sendEditWords", {
        title,
        id,
        editWords: this.editList,
        userid: this.userID,
        wordsid: index
      });
      this.stopEdit();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    successDelete(isTrue) {
      this.$store.commit("HANDLER_MODAL_DELETE", false);
      if (isTrue) this.deleteWords(this.wordsArray.title);
    },
    openModal() {
      console.log(this.wordsArray);
      this.$store.commit("SET_MODAL_WORDS", { isModal: true, title: this.wordsArray.title, list: this.wordsArray.words })
    },
    modalDelete(isTrue) {
      this.$store.commit('HANDLER_MODAL_DELETE', isTrue)
    },
    async setModalSection() {
      await this.$store.dispatch("getFoldersList")
      this.$store.commit("SET_MODAL_SECTIONS", true)
    },
    saveSection(item) {
      this.section = item
    },
    sendSection(isTrue) {
      if (!isTrue) this.section = null
      if (isTrue && this.section != null) this.$store.dispatch("addWordsToSection", {section: this.section, title: this.wordsArray.title})
      this.$store.commit("SET_MODAL_SECTIONS", false)
    }
  }
};
</script>
