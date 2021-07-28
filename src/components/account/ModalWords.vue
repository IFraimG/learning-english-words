<template>
  <div @click="modalClose" class="modal__wrapper">
    <div @click.stop ref="modalContent" class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h2 v-if="startWords.title == null" ref="modalTitle">Создать список слов</h2>
          <h2 v-else ref="modalTitle">Добавить новые слова</h2>
          <input
            v-if="startWords.title == null"
            ref="inputTitle"
            v-model="titleWords"
            placeholder="Ваше название словаря..."
            type="text"
          />
          <button @click="modalClose" class="profile__run modal__btn-image">
            <span>Закрыть</span>
            <img src="@/assets/cancel.png" alt="" />
          </button>
        </div>
        <div class="modal__form">
          <div
            class="modal__item"
            v-for="(num, index) of wordsList.value.length + 1"
            :key="index"
          >
            <input-words :wordIndex="index" @setNumInput="setNumInput" />
          </div>
        </div>
        <div class="modal__errors-wrapper" v-if="incorrectWord != null">
          <div class="modal__errors">
            <p class="modal__message">Данное слово введено неправильно!</p>
            <p v-if="incorrectWord.correct != undefined">
              Возможно вы имели ввиду: <span>{{ incorrectWord.correct }}</span>
            </p>
          </div>
        </div>
        <div class="modal__footer">
          <button
            @click="sendData"
            type="submit"
            class="profile__run modal-button__run modal__save modal__btn-image"
          >
            Сохранить
          </button>
          <button
            type="submit"
            class="profile__run modal__save modal__btn-image"
            @click="resetData"
          >
            <span>Очистить</span>
            <img src="@/assets/delete.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import "./scss/ModalWords.scss";
import InputWords from "./InputWords.vue";
import { computed, defineComponent, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';

export default defineComponent({
  name: "ModalWords",
  components: { InputWords },
  setup() {
    const store = useStore()
    const modalContent: any = ref(null)

    onMounted(() => nextTick(() => document.documentElement.style.overflow = "hidden"))
    onUnmounted(() => document.documentElement.style.overflow = "auto")

    let incorrectWord = computed(() => store.getters.incorrectWord)
    let startWords = computed(() => store.getters.startModalWords)

    let wordsList: any = reactive({ value: [] })
    let editData: any = reactive({ currentTime: "", english: "", russian: "", id: "" })

    let titleWords = ref("")
    let modalTitle: any = ref(null)
    let inputTitle: any = ref(null)

    const resetData = () => {
      wordsList.value = [];
      titleWords.value = "";
      editData = null
      store.commit("CHECK_CORRECT_WORD", null);
    }

    const modalClose = () => {
      wordsList.value = [];
      store.commit("SET_MODAL_WORDS", { list: null, title: null });
      history.back()
    }

    const sendData = async () => {
      if (wordsList.value.length == 0) {
        modalTitle.value.innerHTML = "Вы не заполнили словарь!";
        modalTitle.value.style.color = "red";
      } else {
        if (startWords.value.title != null) titleWords.value = startWords.value.title
        if (titleWords.value.length == 0) {
          inputTitle.value.placeholder = "Вы не ввели название !";
          inputTitle.value.classList.add("modal__header-error");
        } else {
          if (startWords.value.title == null) await store.dispatch("checkTitles", titleWords.value)
          if (store.getters.isRepeatingTitle) {
            modalTitle.value.innerHTML = "Такое название уже существует !";
            modalTitle.value.style.color = "red";
          } else {
            document.documentElement.style.overflow = "auto"
            await store.dispatch("createList", { list: wordsList.value, titleWords: titleWords.value });
            resetData();
            modalClose()
          }
        }
      }
    }

    const getWordID = () => {
      let text = "";
      let words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 16; i++) {
        text += words.charAt(Math.floor(Math.random() * words.length));
      }
      return text;
    }

    const checkValidID = (id: any) => {
      let isValid = true;
      wordsList.value.forEach((item: any) => {
        if (item.id == id) isValid = false;
      });
      return isValid;
    }

    const setNumInput = (data: any) => {
      editData = data.word
      let isValid = false;
      let id = "";

      while (!isValid) {
        id = getWordID();
        isValid = checkValidID(id);
      }

      editData.id = id;
      store.dispatch("checkCorrectWord", { wordData: editData }).then(() => {
        if (incorrectWord.value == null) {
          wordsList.value[data.index] = editData
          editData = null
          nextTick(() =>  modalContent.value.style.marginBottom = `${20 * wordsList.value.length}px`)
        }
      });
    }

    return { 
      wordsList, titleWords, editData,
      setNumInput, getWordID, checkValidID,
      resetData, modalClose, sendData, incorrectWord,
      modalTitle, inputTitle, startWords, modalContent
    }
  }
})
</script>
