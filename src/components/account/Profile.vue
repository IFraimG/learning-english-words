<template>
  <div v-if="profile != null" class="profile">
    <div class="profile__content">
      <img loading="lazy" src="@/assets/user.webp" />
      <h2>{{ profile.login }}</h2>
      <p>{{ profile.email }}</p>
      <router-link to="/account/words">
        <button class="profile__run">
          {{ Ti18N("account.btnAddWords") }}
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import "./scss/Profile.scss"

  export default {
    name: "Profile",
    props: {
      profile: Object,
    },
    inject: ["Ti18N"]
  }
</script>
