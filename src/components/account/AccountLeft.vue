<template>
  <div class="account__left-wrapper">
    <div class="account__left">
      <ul class="account__left-list">
        <li class="account__left-item-wrapper">
          <div class="account__left-item clip-anim account__left-profile">
            <Profile :profile="profile" />
          </div>
        </li>
        <li class="account__left-item-wrapper">
          <div class="account__left-item">
            <h3>Переключить тему</h3>
            <ThemeSwitcher />
          </div>
        </li>
        <li class="account__left-item-wrapper">
          <div class="account__left-item">
            <DictionaryVidget />
          </div>
        </li>
        <li class="account__left-item-wrapper">
          <div class="account__left-item">
            <CreateFolder />
          </div>
        </li>
        <li class="account__left-item-wrapper">
          <div class="account__left-item">
            <ExportWords />
          </div>
        </li>
        <li class="account__left-item-wrapper">
          <div class="account__left-item">
            <h3 v-if="wordsLength > 0" class="account__left-words">{{ Ti18N("account.allWords") }}: {{ wordsLength }}</h3>
            <h3 v-else>{{ Ti18N("account.allWords") }}: 0</h3>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { computed, defineComponent } from "vue"
  import "./scss/leftPanel/LeftPanel.scss"

  import Profile from "./Profile.vue"
  import ThemeSwitcher from "../app/ThemeSwitcher.vue"
  import ExportWords from "./ExportWords.vue"
  import CreateFolder from "../folders/CreateFolder.vue"
  import DictionaryVidget from "../dictionary/DictionaryVidget.vue"
  import { useStore } from "vuex"

  export default defineComponent({
    name: "AccountLeft",
    components: {
      Profile,
      DictionaryVidget,
      CreateFolder,
      ExportWords,
      ThemeSwitcher
    },
    inject: ["Ti18N"],
    setup() {
      const store = useStore()
      const profile = computed(() => store.getters.profile)
      const wordsLength = computed(() => store.getters.wordsLength)

      return { profile, wordsLength }
    }
  })
</script>
