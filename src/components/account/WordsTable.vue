<template>
  <div ref="listWords" class="list__info" @mousedown.stop @contextmenu.prevent="setOpenPanel($event, index)" @click.ctrl.stop @click.exact="runWords(wordsArray.title)">
    <div v-if="!editMode && isOpenPanel == index" ref="panel" class="list__panel" @mousedown.stop.prevent @click.stop.prevent>
      <!-- попробовать настроить vissibility hidden -->
      <Panel :words="wordsArray.words" :userID="$route.params.id" :title="wordsArray.title" @openModal="openModal" @editWords="editWords" @setOpenPanel="setOpenPanel($event, -1)" />
    </div>
    <div class="list__title">
      <h3>{{ wordsArray.title }}</h3>
      <div v-if="isMyUser" class="list__buttons">
        <button v-if="editMode" class="profile__run" @click="deleteWords(wordsArray.title)">{{ Ti18N("account.wordsTable.panel.delete") }}</button>
        <button v-if="editMode != wordsArray.title" class="profile__run" @click.stop="editWords(wordsArray.words, wordsArray.title)">{{ Ti18N("account.wordsTable.panel.change") }}</button>
        <button v-else class="profile__run" @click.stop="stopEdit">{{ Ti18N("account.wordsTable.panel.cancel") }}</button>
      </div>
      <button ref="btnAddToList" v-if="!isMyUser && isAddedToMyDictionaryList != index && index != -1" @click.stop="saveDictionary" class="profile__run">Добавить в свой словарь</button>
      <p v-else-if="!isMyUser && isAddedToMyDictionaryList == index">Успешно добавлено</p>
    </div>
    <div v-for="(words, index2) of wordsArray.words" :key="words" class="list__words">
      <words-list v-if="editMode != wordsArray.title" :words="wordsArray.words[index2]" :index="index" />
      <account-word v-else :word-data="editList.value[index2]" :title="wordsArray.title" :index="index2" @saveWord="saveWord" />
    </div>
    <div v-if="editMode == wordsArray.title" class="list__footer" @click.stop>
      <button class="profile__run" @click="saveEditWords(wordsArray.title, wordsArray.id)">{{ Ti18N("account.wordsTable.panel.save") }}</button>
      <button class="profile__run" @click="openModal">{{ Ti18N("account.wordsTable.panel.newWords") }}</button>
      <button class="profile__run">
        <router-link :to="`/account/${userID}/setupfolder?title=${wordsArray.title}`">{{ Ti18N("account.wordsTable.panel.addToSection") }}</router-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { useStore } from "vuex"
  import "./scss/Account.scss"
  import AccountWord from "@/components/account/AccountWord.vue"
  import { nextTick, ref, reactive, computed, defineComponent } from "vue"
  import { useRoute, useRouter } from 'vue-router'
  import Panel from './Panel.vue'
  import WordsList from "./WordsList.vue"

  export default defineComponent({
    name: "WordsTable",
    components: { AccountWord, Panel, WordsList },
    props: {
      wordsArray: Object as any,
      index: Number,
      isOpenPanel: Number,
    },
    emits: ["setOpenPanel"],
    inject: ["Ti18N"],
    setup(props, { emit }: any) {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()

      const editMode = ref<boolean | string>(false)
      const section: any = ref(null)
      const panel: any = ref(null)
      const listWords: any = ref(null)
      const isAddedToMyDictionaryList = ref<number | any>(-1)
      const editList: any = reactive({ value: [] })
      const btnAddToList = ref<any>(null)

      const userID = route.params.id
      const currentWords = computed(() => store.getters.currentWords)
      const isLoader = computed(() => store.getters.isLoader)
      const profile = computed(() => store.getters.profile)
      const isMyUser = computed(() => store.getters.isMyUser)

      const runWords = (title: any) => {
        if (editMode.value != title) {
          const index = currentWords.value.findIndex((wordsArray: any) => title == wordsArray.title)
          // router.push(`/words/${userID.value}/${index}/?type=start`)
          const routePath = router.resolve({ name: "Words", params: { userid: userID, wordsid: index }, query: { type: "start" }})
          window.open(routePath.href, "_blank")
        }
      }

      const setOpenPanel = (event: any, num: number) => {
        if (!isMyUser.value) return
        emit("setOpenPanel", num)

        const posList = listWords.value.getBoundingClientRect()
        const posx = event.clientX - posList.x
        const posy = event.clientY - posList.y

        if (panel.value != null) {
          panel.value.style.left = posx + "px"
          panel.value.style.top = posy + "px"
        }
      }

      const editWords = (words: any, title: string) => {
        editMode.value = title
        editList.value = [...words]
      }

      const stopEdit = () => {
        editList.value = []
        editMode.value = false
      }

      const saveWord = (data: any) => editList.value[data.index] = data.word

      const saveEditWords = async (title: string, id: number) => {
        const index = currentWords.value.findIndex((wordList: any) => title == wordList.title)
        await store.dispatch("sendEditWords", {
          title,
          id,
          editWords: editList.value,
          userid: userID,
          wordsid: index,
        })
        stopEdit()
        nextTick(() => window.scrollTo({ top: 0, behavior: "smooth" }))
      }

      const openModal = () => {
        store.commit("SET_MODAL_WORDS", { title: props.wordsArray.title, list: props.wordsArray.words })
        stopEdit()
        nextTick(() => window.scrollTo({ top: 0, behavior: "smooth" }))
        store.commit("SET_PUSHING_WORD", true)
      }

      const deleteWords = (title: string) => router.push(`/account/${userID}/delete?title=${title}`)

      const saveDictionary = async () => {
        btnAddToList.value.disabled = true
        await store.dispatch("createList", { titleWords: props.wordsArray.title, list: props.wordsArray.words })
        isAddedToMyDictionaryList.value = props.index
        btnAddToList.value.disabled = false
      }

      return {
        editMode, editList, section, runWords, saveEditWords,
        saveWord, openModal, editWords, userID, listWords, deleteWords, saveDictionary, btnAddToList,
        currentWords, isLoader, profile, stopEdit, panel, setOpenPanel, isMyUser, isAddedToMyDictionaryList
      }
    }
  })
</script>
