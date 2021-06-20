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

<script>
import { useStore } from "vuex";
import "./scss/ModalWords.scss";
import InputWords from "./InputWords.vue";
import { computed, reactive, ref } from 'vue';

export default {
  name: "ModalWords",
  components: { InputWords },
  emits: ["setModal"],
  props: {
    isModal: Boolean,
    profile: Object
  },
  setup(props, { emit }) {
    const store = useStore()
    let incorrectWord = computed(() => store.getters.incorrectWord)

    let wordsList = reactive([])
    let editData = reactive(null)

    let titleWords = ref("")
    let modalTitle = ref(null)
    let inputTitle = ref(null)

    const resetData = () => {
      wordsList = [];
      titleWords.value = "";
      editData = null
      store.commit("CHECK_CORRECT_WORD", null);
    }

    const modalClose = () => {
      wordsList = [];
      emit("setModal", false);
    }

    const sendData = () => {
      if (wordsList.length == 0) {
        modalTitle.value.innerHTML = "Вы не заполнили словарь!";
        modalTitle.value.style.color = "red";
      } else {
        console.log(titleWords.value);
        if (titleWords.value.length > 0) {
          store.dispatch("createList", {
            profile: props.profile,
            list: wordsList,
            titleWords: titleWords.value
          });
          resetData();
          emit("setModal", false);
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

    const checkValidID = (id) => {
      let isValid = false;
      wordsList.forEach(item => {
        if (item.id == id) isValid = true;
      });
      return isValid;
    }

    const setNumInput = (data) => {
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
      setNumInput, getWordID, checkValidID,
      resetData, modalClose, sendData, incorrectWord,
      modalTitle, inputTitle
    }
  }
};
</script>
