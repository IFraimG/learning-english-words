<template>
  <div v-if="props.profile != null" class="profile">
    <div class="profile__content">
      <img loading="lazy" src="@/assets/user.webp" />
      <h2>{{ props.profile.login }}</h2>
      <p>{{ props.profile.email }}</p>
      <router-link :to="`/account/${props.profile.id}/words`">
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

  const Ti18N = inject("Ti18N")
</script>
