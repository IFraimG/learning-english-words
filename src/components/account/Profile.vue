<template>
  <div v-if="profile != null" class="profile">
    <div class="profile__content">
      <img loading="lazy" src="@/assets/user.webp" />
      <h2>{{ profile.login }}</h2>
      <p>{{ profile.email }}</p>
      <router-link to="/account/words">
        <button class="profile__run">
          Добавить новые слова
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: {
    profile: Object
  }
};
</script>

<style></style>
