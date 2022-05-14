<template>
  <div class="sentences__wrapper">
    <div class="sentences">
      <h1>Составьте предложения со словами</h1>
      <div v-for="(item, index) of currentWords" :key="item.russian" class="sentences__item">
        <h3>{{ item.russian }} -</h3>
        <textarea class="input-focus" :ref="el => { if (el) sentences[index] = el }" rows="1" @keydown.enter.prevent="checkItem(index)" />
        <div v-if="doneList.value[index].english == item.english" class="sentences__stats">
          <div v-if="doneList.value[index].isDone == 0" class="sentences__error sentences__error-null">
            <p>Вы допустили ошибку в слове</p>
          </div>
          <div v-if="doneList.value[index].isDone == 1" class="sentences__error sentences__error-first">
            <p>Все верно !</p>
          </div>
          <div v-if="doneList.value[index].isDone == 2" class="sentences__error sentences__error-second">
            <p>Слишком маленькое предложение</p>
          </div>
        </div>
      </div>
      <button class="profile__run sentences__finish" @click="$router.push('/account')">Завершить</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, reactive, ref } from "vue"
  import "./scss/sentences/Sentences.scss"

  export default defineComponent({
    name: "Sentences",
    setup() {
      const currentWords: any = inject("currentWords")
      const sentences = ref<any[]>([])
      const doneList = reactive<any>({ value: [] })

      currentWords.value.map((item: any) => doneList.value.push({ english: item.english, isDone: -1 }))

      const checkItem = (index: number) => {
        const value = sentences.value[index].value
        if (value != "") {
          const wordsList = value
            .trimStart()
            .trimEnd()
            .split(" ")
          const len = wordsList.length
          const original = currentWords.value[index].english.split(" ")

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

            if (buildWord.join(" ") == currentWords.value[index].english) {
              isWord = 1
              break
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
    },
  })
</script>
