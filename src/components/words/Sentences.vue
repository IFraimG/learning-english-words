<template>
  <div class="sentences__wrapper">
    <div class="sentences">
      <h1>Составьте предложения со словами</h1>
      <div class="sentences__item" v-for="(item, index) of currentWords" :key="item.russian">
        <h3>{{ item.russian }} -</h3>
        <textarea
          rows="1"
          @keydown.enter.prevent="checkItem(index)"
          :ref="el => { if (el) sentences[index] = el }"
        />
        <div
          class="sentences__stats"
          v-if="doneList.value[index].english == item.english && doneList.value[index].isDone != -1"
        >
          <div class="sentences__error sentences__error-null" v-if="doneList.value[index].isDone == 0">
            <p>Вы допустили ошибку в слове</p>
          </div>
          <div class="sentences__error sentences__error-first" v-if="doneList.value[index].isDone == 1">
            <p>Все верно !</p>
          </div>
          <div class="sentences__error sentences__error-second" v-if="doneList.value[index].isDone == 2">
            <p>Слишком маленькое предложение</p>
          </div>
        </div>
      </div>
      <button @click="$router.push('/account')" class="profile__run sentences__finish">Завершить</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, nextTick, onMounted, reactive, ref } from 'vue'
  import "./scss/sentences/Sentences.scss"

  export default defineComponent({
    name: "Sentences",
    setup() {
      let currentWords: any = inject("currentWords")
      let sentences = ref<any[]>([])
      let doneList = reactive<any>({ value: [] })

      currentWords.value.map((item: any) => doneList.value.push({ english: item.english, isDone: -1 }))

      onMounted(() => {
        nextTick(() => window.scrollTo({ top: 0 }))
      })

      const checkItem = (index: number) => {
        let value = sentences.value[index].value
        if (value != "") {
          let wordsList = value.trimStart().trimEnd().split(" ")
          let len = wordsList.length
          let original = currentWords.value[index].english.split(" ")

          let indexOrigin = 0
          let buildWord = []
          let isWord = 0

          for (let i = 0; i < len; i++) {
            if (wordsList[i] == original[indexOrigin]) {
              buildWord.push(wordsList[i])
              indexOrigin++
            } else {
              buildWord = []
              indexOrigin = 0
            }

            if (buildWord.join(' ') == currentWords.value[index].english) {
              isWord = 1;
              break;
            }
          }

          if (wordsList.length < 4) doneList.value[index].isDone = 2
          else {
            doneList.value[index].isDone = isWord
            if (doneList.value[index].isDone == 1) sentences.value[index].disabled = true
          }
        } else doneList.value[index].isDone = 2
      }

      return { currentWords, sentences, checkItem, doneList }
    }
  })
</script>