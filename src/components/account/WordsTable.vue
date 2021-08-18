<template>
  <div ref="listWords" class="list__info" @mousedown="setPanel" @contextmenu.prevent="$emit('setOpenPanel', index)" @click="runWords(wordsArray.title)">
    <div v-if="isOpenPanel == index && !editMode" ref="panel" class="list__panel" @mousedown.stop @click.stop>
      <ul class="list__panel-content">
        <li class="list__panel-item" @click.stop="editWords(wordsArray.words, wordsArray.title)">
          {{ Ti18N("account.wordsTable.panel.change") }}
        </li>
        <li class="list__panel-item">
          <router-link :to="'/account/setupfolder?title=' + wordsArray.title">
            {{ Ti18N("account.wordsTable.panel.addToSection") }}
          </router-link>
        </li>
        <li class="list__panel-item" @click="openModal">
          {{ Ti18N("account.wordsTable.panel.newWords") }}
        </li>
        <li class="list__panel-item" @click="$emit('setOpenPanel', -1)">
          <router-link :to="'/account/delete?title=' + wordsArray.title">
            {{ Ti18N("account.wordsTable.panel.delete") }}
          </router-link>
        </li>
        <li class="list__panel-item" @click="$emit('setOpenPanel', -1)">
          {{ Ti18N("account.wordsTable.panel.cancel") }}
        </li>
      </ul>
    </div>
    <div class="list__title">
      <h3>{{ wordsArray.title }}</h3>
      <button v-if="editMode" class="profile__run">
        <router-link :to="'/account/delete?title=' + wordsArray.title">
          {{ Ti18N("account.wordsTable.panel.delete") }}
        </router-link>
      </button>
      <button v-if="editMode != wordsArray.title" class="profile__run" @click.stop="editWords(wordsArray.words, wordsArray.title)">
        {{ Ti18N("account.wordsTable.panel.change") }}
      </button>
      <button v-else class="profile__run" @click.stop="stopEdit">
        {{ Ti18N("account.wordsTable.panel.cancel") }}
      </button>
    </div>
    <div v-for="(words, index) of wordsArray.words" :key="index" class="list__words">
      <p v-if="editMode != wordsArray.title" class="list__item">
        <span class="list__english">{{ words.english }}</span>
        -
        <span class="list__russian">{{ words.russian }}</span>
      </p>
      <account-word v-else :word-data="editList[index]" :title="wordsArray.title" :index="index" @saveWord="saveWord" />
    </div>
    <div v-if="editMode == wordsArray.title" class="list__footer" @click.stop>
      <button class="profile__run" @click="saveEditWords(wordsArray.title, wordsArray.id)">
        {{ Ti18N("account.wordsTable.panel.save") }}
      </button>
      <button class="profile__run" @click="openModal">
        {{ Ti18N("account.wordsTable.panel.newWords") }}
      </button>
      <button class="profile__run">
        <router-link :to="'/account/setupfolder?title=' + wordsArray.title">
          {{ Ti18N("account.wordsTable.panel.addToSection") }}
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"
  import "@/components/account/scss/Account.scss"
  import AccountWord from "@/components/account/AccountWord.vue"
  import { nextTick } from "vue"

  export default {
    name: "WordsTable",
    components: { AccountWord },
    props: {
      wordsArray: Object,
      index: Number,
      isOpenPanel: Number,
    },
    inject: ["Ti18N"],
    emits: ["setOpenPanel"],
    data() {
      return {
        editMode: false,
        editList: [],
        section: null,
      }
    },
    computed: {
      reverseWords() {
        const newArray = []
        for (let i = this.currentWords.length - 1; i >= 0; i--) {
          newArray.push(this.currentWords[i])
        }
        return newArray
      },
      ...mapGetters(["userID", "currentWords", "isLoader", "profile"]),
    },
    methods: {
      runWords(title) {
        if (this.editMode != title) {
          const index = this.currentWords.findIndex(wordsArray => title == wordsArray.title)
          this.$router.push(`/words/${this.userID}/${index}/?type=start`)
        }
      },
      editWords(words, title) {
        this.editMode = title
        this.editList = [...words]
      },
      stopEdit() {
        this.editList = []
        this.editMode = false
      },
      saveWord(data) {
        this.editList[data.index] = data.word
      },
      async saveEditWords(title, id) {
        const index = this.currentWords.findIndex(wordList => title == wordList.title)
        await this.$store.dispatch("sendEditWords", {
          title,
          id,
          editWords: this.editList,
          userid: this.userID,
          wordsid: index,
        })
        this.stopEdit()
        nextTick(() => window.scrollTo({ top: 0, behavior: "smooth" }))
      },
      openModal() {
        this.$store.commit("SET_MODAL_WORDS", { title: this.wordsArray.title, list: this.wordsArray.words })
        this.$router.push("/account/words")
      },
    },
  }
</script>
