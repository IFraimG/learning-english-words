<template>
  <div @click="modalClose" v-if="isModal" class="modal__wrapper">
    <div @click.stop v-if="isModal" class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h2 ref="modalTitle">Создать список слов</h2>
          <input
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
            v-for="(num, index) of wordsList.length + 1"
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
            <span>Сохранить</span>
            <img src="@/assets/save.png" alt="" />
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
import { computed, defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: "ModalWords",
  components: { InputWords },
  setup() {
    const store = useStore()
    let incorrectWord = computed(() => store.getters.incorrectWord)
    // const startWords = computed(() => store.getters.startModalWords)

    let wordsList: any = reactive([])
    let editData: any = reactive({ currentTime: "", english: "", russian: "", id: "" })

    let titleWords = ref("")
    let modalTitle: any = ref(null)
    let inputTitle: any = ref(null)

    const resetData = () => {
      wordsList = [];
      titleWords.value = "";
      editData = null
      store.commit("CHECK_CORRECT_WORD", null);
    }

    const modalClose = () => {
      wordsList = [];
      store.commit("SET_MODAL_WORDS", { isModal: false });
    }

    const sendData = () => {
      if (wordsList.length == 0) {
        modalTitle.value.innerHTML = "Вы не заполнили словарь!";
        modalTitle.value.style.color = "red";
      } else {
        console.log(titleWords.value);
        if (titleWords.value.length > 0) {
          store.dispatch("createList", {
            list: wordsList,
            titleWords: titleWords.value
          });
          resetData();
          modalClose()
        } else {
          inputTitle.value.placeholder = "Вы не ввели название !";
          inputTitle.value.classList.add("modal__header-error");
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

    const isStart = computed(() => {
      let startWords = store.getters.startModalWords
      if (startWords != null && wordsList.length == 0) return true
      return false
    })

    const checkValidID = (id: any) => {
      let isValid = false;
      wordsList.forEach((item: any) => {
        if (item.id == id) isValid = true;
      });
      return isValid;
    }

    const setNumInput = (data: any) => {
      editData = data.word
      let isValid = true;
      let id = "";

      while (isValid) {
        id = getWordID();
        isValid = checkValidID(id);
      }

      editData.id = id;
      store.dispatch("checkCorrectWord", { wordData: editData }).then(() => {
        if (incorrectWord.value == null) {
          wordsList[data.index] = editData
          editData = null
        }
      });
    }

    return { 
      wordsList, titleWords, editData,
      setNumInput, getWordID, checkValidID, isStart,
      resetData, modalClose, sendData, incorrectWord,
      modalTitle, inputTitle, isModal: computed(() => store.getters.isModalWords)
    }
  }
})
</script>
