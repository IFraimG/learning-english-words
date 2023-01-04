<template>
  <div v-if="props.profile != null" :class="isMyUser ? 'profile' : 'profile profile-short'">
    <div class="profile__content">
      <img loading="lazy" src="@/assets/user.webp" />
      <h2>{{ props.profile.login }}</h2>
      <p>{{ props.profile.email }}</p>
      <router-link v-if="isMyUser" :to="`/account/${props.profile.id}/words`">
        <button class="profile__run">
          {{ Ti18N("account.btnAddWords") }}
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import { inject, defineProps } from '@vue/runtime-core'
  import "./scss/Profile.scss"

  const props = defineProps({
    profile: Object
  })

  const isMyUser = inject("isMyUser")
  const Ti18N = inject("Ti18N")
</script>
