<template>
  <div @dragover.prevent @drop.prevent class="account__left-import-wrapper" style="padding: 10px 0;">
    <label @drop="dropFile" class="profile__run" for="importJSON">Import words from JSON</label>
    <input id="importJSON" ref="files" accept=".json" type="file" class="account__left-import profile__run" @change="importHandle" />
    <p class="account__left-import-err" v-if="isErr">Файл поврежден, и не может быть загружен</p>
    <div v-if="isLoaded">
      <p>{{ fileInfo.name }}</p>
      <p>{{ fileInfo.lists }} списков</p>
      <p>{{ fileInfo.wordsLength }} слов</p>
      <button class="profile__run" @click="loadWords">Загрузить !</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue"
  import { useStore } from "vuex"

  export default defineComponent({
    name: "ExportWords",
    inject: ["Ti18N"],
    setup() {
      const store = useStore()
      const files = ref<any>(null)
      const isErr = ref<boolean>(false)
      const isLoaded = ref<boolean>(false)
      const fileInfo = ref<any>({
        name: "",
        lists: 0,
        wordsLength: 0
      })
      const resultWords: any = []

      const importHandle = (file: any = files.value.files) => {
        if (file.length > 0) {
          const reader = new FileReader()

          reader.onload = () => {
            try {
              resultWords.value = JSON.parse(reader.result as any)

              fileInfo.value.name = file[0].name
              fileInfo.value.lists = resultWords.value.length
              resultWords.value.forEach((item: any) => fileInfo.value.wordsLength += item.words.length)

              isErr.value = false
              isLoaded.value = true
            } catch (error: any) {
              files.value = ""
              isErr.value = true
              isLoaded.value = false
            }
          }

          reader.onerror = () => {
            files.value = ""
            isErr.value = true
            isLoaded.value = false
          }

          reader.readAsText(file[0])
        }
      }

      const dropFile = (event: any) => importHandle(event.dataTransfer.files)

      const loadWords = () => {
        store.dispatch("loadWordsFromJSON", resultWords.value)
        isLoaded.value = false
        isErr.value = false
        fileInfo.value = { name: "", lists: 0, wordsLength: 0 }
      }

      return { importHandle, files, isErr, isLoaded, fileInfo, loadWords, dropFile }
    },
  })
</script>
  