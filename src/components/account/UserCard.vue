<template>
  <div v-if="$props.userData != null" class="users_card" @click="redirect">
    <img src="../../assets/user.png" alt="logotype" />
    <div class="users_card__info">
      <h3>{{ $props.userData.login }}</h3>
      <p>{{ Ti18N("users.lenOfList") }}: {{ $props.userData.words }}</p>
      <p>{{ Ti18N("users.latest") }}: {{ $props.userData.title }}</p>
      <p>{{ Ti18N("users.lenOfFolders") }}: {{ $props.userData.folders }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "@vue/runtime-core"
  import { useRouter } from "vue-router"

  export default defineComponent({
    name: "UserCard",
    components: {},
    inject: ["Ti18N"],
    props: {
      userData: Object
    },
    setup(props: any) {
      const router = useRouter()
      const redirect = () => router.push("/account/" + props.userData.id)

      return { redirect }
    },
  })
</script>
