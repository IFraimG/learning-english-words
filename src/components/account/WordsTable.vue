<template>
  <div ref="listWords" class="list__info" @mousedown.stop.prevent @contextmenu.prevent="setOpenPanel($event, index)" @click.ctrl.stop @click.exact="runWords(wordsArray.title)">
    <div v-if="!editMode && isOpenPanel == index" ref="panel" class="list__panel" @mousedown.stop.prevent @click.stop.prevent>
      <Panel :words="wordsArray.words" :title="wordsArray.title" @openModal="openModal" @editWords="editWords" @setOpenPanel="setOpenPanel($event, -1)" />
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
        <span v-if="words?.enValues == null" class="list__english">{{ words.english }}</span>
        <span v-else>
          <span class="list__english" v-for="(item, index) of words.enValues" :key="item">
            {{ item }}
            <span v-if="index != words.enValues.length - 1">, </span>
          </span>
        </span>
        -
        <span v-if="words?.ruValues == null" class="list__russian">{{ words.russian }}</span>
        <span v-else>
          <span class="list__russian" v-for="(item, index) of words.ruValues" :key="item">
            {{ item }}
            <span v-if="index != words.ruValues.length - 1">, </span>
          </span>
        </span>
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
  import Panel from './Panel.vue'

  export default {
    name: "WordsTable",
    components: { AccountWord, Panel },
    props: {
      wordsArray: Object,
      index: Number,
      isOpenPanel: Number,
    },
    inject: ["Ti18N"],
    emits: ["setOpenPanel"],
    setup(props, { emit }) {
      const store = useStore()
      const router = useRouter()

      const editMode = ref(false)
      const section = ref(null)
      const panel = ref(null)
      const listWords = ref(null)
      const editList = reactive({ value: [] })

      const userID = computed(() => store.getters.userID)
      const currentWords = computed(() => store.getters.currentWords)
      const isLoader = computed(() => store.getters.isLoader)
      const profile = computed(() => store.getters.profile)

      const runWords = title => {
        if (editMode.value != title) {
          const index = currentWords.value.findIndex(wordsArray => title == wordsArray.title)
          router.push(`/words/${userID.value}/${index}/?type=start`)
        }
      }

      const setOpenPanel = (event, num) => {
        emit("setOpenPanel", num)

        const posList = listWords.value.getBoundingClientRect()
        const posx = event.clientX - posList.x
        const posy = event.clientY - posList.y

        if (panel.value != null) {
          panel.value.style.left = posx + "px"
          panel.value.style.top = posy + "px"
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

      const saveWord = data => editList.value[data.index] = data.word

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

      return {
        editMode, editList, section, runWords, saveEditWords,
        saveWord, openModal, editWords, userID, listWords,
        currentWords, isLoader, profile, stopEdit, panel, setOpenPanel
      }
    }
  }
</script>
