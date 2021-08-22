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
      <account-word v-else :word-data="editList.value[index]" :title="wordsArray.title" :index="index" @saveWord="saveWord" />
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
  import { useStore } from "vuex"
  import "@/components/account/scss/Account.scss"
  import AccountWord from "@/components/account/AccountWord.vue"
  import { nextTick, ref, reactive, computed } from "vue"
  import { useRouter } from 'vue-router'

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
    setup(props) {
      const store = useStore()
      const router = useRouter()

      const editMode = ref(false)
      const section = ref(null)
      const editList = reactive({ value: [] })

      const userID = computed(() => store.getters.userID)
      const currentWords = computed(() => store.getters.currentWords)
      const isLoader = computed(() => store.getters.isLoader)
      const profile = computed(() => store.getters.profile)

      const runWords = (title) => {
        if (editMode.value != title) {
          const index = currentWords.value.findIndex(wordsArray => title == wordsArray.title)
          router.push(`/words/${userID.value}/${index}/?type=start`)
        }
      }

      const editWords = (words, title) => {
        editMode.value = title
        editList.value = [...words]
      }

      const stopEdit = () => {
        editList.value = []
        editMode.value = false
      }

      const saveWord = (data) => editList.value[data.index] = data.word

      const saveEditWords = async (title, id) => {
        const index = currentWords.value.findIndex(wordList => title == wordList.title)
        await store.dispatch("sendEditWords", {
          title,
          id,
          editWords: editList.value,
          userid: userID.value,
          wordsid: index,
        })
        stopEdit()
        nextTick(() => window.scrollTo({ top: 0, behavior: "smooth" }))
      }

      const openModal = () => {
        store.commit("SET_MODAL_WORDS", { title: props.wordsArray.title, list: props.wordsArray.words })
        router.push("/account/words")
      }

      const reverseWords = computed(() => {
        const newArray = []
        for (let i = currentWords.value.length - 1; i >= 0; i--) {
          newArray.push(currentWords[i].value)
        }
        return newArray
      })

      return {
        editMode, editList, section, runWords, saveEditWords,
        saveWord, openModal, reverseWords, editWords, userID,
        currentWords, isLoader, profile, stopEdit
      }
    }
  }
</script>
