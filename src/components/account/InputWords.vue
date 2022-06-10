<template>
  <div class="modal__fields">
    <div class="modal__left">
      <Swiper class="modal__sliders" :slides-per-view="1" :grid="{ rows: 1 }" :scrollbar="{ draggable: true }" @swiper="onSwiperEN">
        <swiper-slide v-for="(item, index) of newWord.enValues" :key="index" class="modal__slide">
          <input ref="englishWord" v-model="newWord.enValues[index]" class="modal__input input-light" type="text" pattern="[A-Za-z]" placeholder="Слово на английском" @input="editDone(false)" @keyup.enter="setInputEnActive" />
          <p>{{ index + 1 }} / {{ newWord.enValues.length }}</p>
        </swiper-slide>
      </Swiper>
      <button @click="makeNewInputEN" class="modal-btn-plus">+</button>
      <Swiper class="modal__sliders" :grid="{ rows: 1 }" :slides-per-view="1" :scrollbar="{ draggable: false }" @swiper="onSwiperRU">
        <swiper-slide v-for="(item, index) of newWord.ruValues" :key="index" class="modal__slide">
          <input ref="russianWord" v-model="newWord.ruValues[index]" class="modal__input input-light" type="text" pattern="[А-Яа-яЁё]" placeholder="Перевод слова на русском" @input="editDone(false)"  @keyup.enter="setInputRuActive" />
          <p>{{ index + 1 }} / {{ newWord.ruValues.length }}</p>
        </swiper-slide>
      </Swiper>
      <button @click="makeNewInputRU" class="modal-btn-plus">+</button>
      <select-time :time-edit="null" @setTime="setTime" />
    </div>
    <div class="modal__right">
      <button v-if="!isDone.value" class="profile__run modal-button__run btn-add" @click="setNumInput">
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
  import { Controller } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import "swiper/components/pagination/pagination.min.css"
  import "swiper/swiper.scss"

  import { reactive, ref } from "vue"
  import "@/components/modals/scss/ModalWords.scss"
  import "@/components/account/scss/InputWords.scss"
  import SelectTime from "./SelectTime.vue"

  export default {
    name: "InputWords",
    components: { SelectTime, Swiper, SwiperSlide },
    props: {
      wordIndex: Number,
      isStartValue: Boolean,
      startValue: Object || null,
    },
    emits: ["setValueInput", "currentTime"],
    setup(props, { emit }) {
      const isDone = reactive({ value: false })
      const englishWord = ref(null)
      const russianWord = ref(null)

      const currentEN = ref(0)
      const currentRU = ref(0)

      const controlledSwiperEN = ref(null)
      const controlledSwiperRU = ref(null)

      const newWord = ref({ english: "", russian: "", id: "", currentTime: "", enValues: [""], ruValues: [""] })

      const setInputEnActive = () => russianWord.value.focus()
      const setInputRuActive = () => setNumInput()

      const setNumInput = () => {
        if (newWord.value.enValues[0].trim() == "") {
          englishWord.value.style.border = "1px solid #f05454"
          russianWord.value.style.border = "1px solid transparent"
        } else if (newWord.value.ruValues[0].trim() == "") {
          russianWord.value.style.border = "1px solid #f05454"
          englishWord.value.style.border = "1px solid transparent"
        } else {
          englishWord.value.style.border = "1px solid #00af91"
          russianWord.value.style.border = "1px solid #00af91"

          if (newWord.value.enValues[newWord.value.enValues.length - 1] == "") newWord.value.enValues.pop()
          if (newWord.value.ruValues[newWord.value.ruValues.length - 1] == "") newWord.value.ruValues.pop()

          emit("setValueInput", {
            word: { ...newWord.value, english: newWord.value.enValues[0], russian: newWord.value.ruValues[0]
          }, index: props.wordIndex })
          editDone(true)
        }
      }

      const makeNewInputRU = () => {
        if (newWord.value.ruValues[newWord.value.ruValues.length - 1] != "") newWord.value.ruValues.push("")
        currentRU.value++
        // controlledSwiperRU.value.slideTo(newWord.value.ruValues.length - 1)
      }
      const makeNewInputEN = () => {
        if (newWord.value.enValues[newWord.value.enValues.length - 1] != "") newWord.value.enValues.push("")
        currentEN.value++
      }

      const setTime = time => {
        editDone(false)
        newWord.value.currentTime = time
      }

      const editDone = done => (isDone.value = done)

      const onSwiperEN = (swiper) => controlledSwiperEN.value = swiper
      const onSwiperRU = (swiper) => controlledSwiperRU.value = swiper

      return {
        setNumInput, setTime, editDone,
        isDone, newWord, englishWord, russianWord, onSwiperEN, onSwiperRU,
        currentEN, currentRU, makeNewInputEN, makeNewInputRU,
        controlledSwiperEN, controlledSwiperRU, Controller, setInputEnActive, setInputRuActive
      }
    },
  }
</script>
