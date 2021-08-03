<template>
  <div class="account__wrapper" v-if="!isLoader">
    <div @mousedown="setOpenPanel(-1)" class="account">
      <div class="account__left">
        <Profile :profile="profile" />
        <DictionaryVidget />
        <CreateFolder />
        <h3 class="account__left-words" v-if="wordsLength > 0">
          Всего слов: {{ wordsLength }}
        </h3>
      </div>
      <div
        class="list"
        @click="setOpenPanel(-1)"
        v-if="currentWords != null && currentWords?.length > 0"
      >
        <FindWord @findItem="findWord" />
        <div class="list__content">
          <WordsTable
            :wordsArray="reverseWords[wordsIndex]"
            :index="wordsIndex"
            :isOpenPanel="isOpenPanel.value"
            @setOpenPanel="setOpenPanel"
          />
        </div>
        <Paginator @nextPage="nextPage" @previousPage="previousPage">
          <template #default>
            <v-pagination
              v-model="wordsIndex"
              :pages="reverseWords.length - 1"
              :range-size="1"
              active-color="#dddddd"
              @update:modelValue="editPage"
            />
          </template>
        </Paginator>
      </div>
      <div v-else class="list__info">
        <p>Вы еще не создали ни один список!</p>
      </div>
    </div>
  </div>
  <router-view v-if="!isLoader"></router-view>
  <Loader v-else />
</template>
<script lang="ts">
  import VPagination from "@hennge/vue3-pagination";
  import "@hennge/vue3-pagination/dist/vue3-pagination.css";
  import "@/components/account/scss/Account.scss";
  import { computed, defineComponent, onMounted, reactive, ref } from "vue";
  import { useStore } from "vuex";

  import Loader from "../components/app/Loader.vue";
  import Profile from "../components/account/Profile.vue";
  import FindWord from "../components/account/FindWord.vue";
  import DictionaryVidget from "../components/account/DictionaryVidget.vue";
  import WordsTable from "../components/account/WordsTable.vue";
  import CreateFolder from "../components/folders/CreateFolder.vue";
  import Paginator from "@/components/app/Paginator.vue";

  export default defineComponent({
    name: "Account",
    components: {
      Loader,
      Profile,
      FindWord,
      WordsTable,
      DictionaryVidget,
      VPagination,
      CreateFolder,
      Paginator,
    },
    setup() {
      const store = useStore();
      let isOpenPanel = reactive({ value: -1 });
      let wordsIndex = ref(1);

      let currentWords = computed(() => store.getters.currentWords);
      let isLoader = computed(() => store.getters.isLoader);
      let profile = computed(() => store.getters.profile);
      let findWords = computed(() => store.getters.findWords);
      let wordsLength = computed(() => store.getters.wordsLength);

      onMounted(() => {
        editPage(1);
        store.dispatch("getWords");
      });

      const setOpenPanel = (num: number) => (isOpenPanel.value = num);
      const editPage = (num: number) => (wordsIndex.value = num);
      const findWord = (word: string) => store.commit("FIND_TITLE", word);

      const previousPage = () => {
        if (wordsIndex.value > 1) editPage(wordsIndex.value - 1);
      };

      const nextPage = () => {
        if (wordsIndex.value < reverseWords.value.length - 1)
          editPage(wordsIndex.value + 1);
      };

      const reverseWords = computed(() => {
        let newArray: Array<any> = [];
        let currentWordsCopy = currentWords.value;
        if (findWords.value.length > 0) currentWordsCopy = findWords.value;
        for (let i = currentWordsCopy.length - 1; i >= 0; i--) {
          newArray.push(currentWordsCopy[i]);
        }
        newArray.unshift({});
        return newArray;
      });

      return {
        setOpenPanel,
        editPage,
        previousPage,
        nextPage,
        reverseWords,
        isOpenPanel,
        currentWords,
        isLoader,
        profile,
        findWords,
        wordsLength,
        wordsIndex,
        findWord,
      };
    },
  });
</script>
