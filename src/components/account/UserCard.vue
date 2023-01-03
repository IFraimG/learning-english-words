<template>
  <div v-if="$props.userData != null" class="users_card" @click="redirect">
    <img src="../../assets/user.png" alt="logotype" />
    <div class="users_card__info">
      <h3>{{ $props.userData.login }}</h3>
      <p>Количество списков: {{ $props.userData.words }}</p>
      <p>Последняя тематика: {{ $props.userData.title }}</p>
      <p>Количество папок: {{ $props.userData.folders }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { UserType } from "@/models/users"
  import { defineComponent } from "@vue/runtime-core"
  import { useRouter } from "vue-router"

  export default defineComponent({
    name: "UserCard",
    components: {},
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
