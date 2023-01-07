<template>
  <div v-if="!isLoader" class="users__wrapper">
    <div class="users">
      <div class="users__content">
        <div class="users__left">
          <h2>{{ t("users.list") }}</h2>
          <input @keydown.enter="findUser" type="text" v-model="userValue" :placeholder="t('users.findUser')" />
          <div class="users__list" v-if="users.length > 0 && userValue.length == 0">
            <user-card v-for="item of users" :key="item.id" :userData="item" />
          </div>
          <button ref="btn" @click="loadMore" v-if="resPosition > 0 && userValue.length == 0" class="btn-add modal-button__run">{{ t("users.showMore") }}</button>
          <div v-if="foundUser != null">
            <user-card :userData="foundUser" />
          </div>
        </div>
        <div class="users__right">
          <!-- разработать в будущем -->
          <!-- <h2>Самые активные пользователи</h2>
          <div class="users__list">
            <user-card />
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <router-view v-if="!isLoader"></router-view>
  <Loader v-else />
</template>

<script lang="ts">
  import UserCard from "@/components/account/UserCard.vue"
  import Loader from "@/components/app/Loader.vue"
  import { UserType } from "@/models/users"
  import { computed, defineComponent, onBeforeMount, onBeforeUnmount, provide, ref, watch } from "@vue/runtime-core"
  import { useI18n } from "vue-i18n"
  import { useStore } from "vuex"
  import "../components/account/scss/usersList/usersList.scss"

  export default defineComponent({
    name: "AccountList",
    components: { UserCard, Loader },
    setup() {
      const store = useStore()
      const isLoader = computed<boolean>(() => store.getters.isLoader)
      const users = computed<Array<UserType>>(() => store.getters.users)
      const resPosition = computed<number>(() => store.getters.differencePos)
      const foundUser = computed<UserType | null>(() => store.getters.foundUser)
      const btn = ref<any>(null)
      const userValue = ref("")

      const { t } = useI18n()
      provide("Ti18N", t)

      onBeforeMount(() => store.dispatch("getUsersList"))
      onBeforeUnmount(() => {
        store.commit("CLEAR_LIST")
        store.commit("SET_FOUND_USER_BY_LOGIN", null)
      })

      watch(userValue, (now, before) => {
        if (now == "" && before.length > 0) store.commit("SET_FOUND_USER_BY_LOGIN", null)
      })

      const findUser = async () => {
        await store.dispatch("getProfileByLogin", userValue.value)
      }
      const loadMore = async () => {
        btn.value.disabled = true
        await store.dispatch("showMoreUsers")
        btn.value.disabled = false
      }
      return { isLoader, users, resPosition, loadMore, btn, userValue, findUser, foundUser, t }
    }
  })
</script>
