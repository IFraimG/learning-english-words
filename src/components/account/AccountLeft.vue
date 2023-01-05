<template>
  <div class="account__left-wrapper">
    <div class="account__left">
      <ul v-if="isMyUser" class="account__left-list">
        <li class="account__left-item-wrapper">
          <div class="account__left-item clip-anim account__left-profile">
            <Profile :profile="profile" />
          </div>
        </li>
        <li class="account__left-item-wrapper">
          <div class="account__left-item">
            <h3>{{ Ti18N("account.toggle") }}</h3>
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
            <ImportWords />
          </div>
        </li>
        <li class="account__left-item-wrapper">
          <div class="account__left-item">
            <h3 v-if="wordsLength > 0" class="account__left-words">{{ Ti18N("account.allWords") }}: {{ wordsLength }}</h3>
            <h3 v-else>{{ Ti18N("account.allWords") }}: 0</h3>
          </div>
        </li>
      </ul>
      <div v-else class="account__left-item clip-anim account__left-profile">
        <Profile :profile="profile" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, provide } from "vue"
  import "./scss/leftPanel/LeftPanel.scss"

  import Profile from "./Profile.vue"
  import ThemeSwitcher from "../app/ThemeSwitcher.vue"
  import ExportWords from "./ExportWords.vue"
  import CreateFolder from "../folders/CreateFolder.vue"
  import DictionaryVidget from "../dictionary/DictionaryVidget.vue"
  import { useStore } from "vuex"
  import ImportWords from "./ImportWords.vue"

  export default defineComponent({
    name: "AccountLeft",
    components: {
      Profile,
      DictionaryVidget,
      CreateFolder,
      ExportWords,
      ThemeSwitcher,
      ImportWords
    },
    inject: ["Ti18N"],
    setup() {
      const store = useStore()
      const profile = computed(() => store.getters.profileOtherUser)
      const wordsLength = computed(() => store.getters.wordsLength)
      const isMyUser = computed(() => store.getters.isMyUser)

      provide("isMyUser", isMyUser.value)

      return { profile, wordsLength, isMyUser }
    }
  })
</script>
