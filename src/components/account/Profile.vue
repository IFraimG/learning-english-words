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
      <ThemeSwitcher style="margin-top: 20px" />
    </div>
  </div>
</template>

<script>
  import ThemeSwitcher from "../app/ThemeSwitcher.vue"

  export default {
    name: "Profile",
    components: { ThemeSwitcher },
    props: {
      profile: Object,
    },
    inject: ["Ti18N"]
  }
</script>
