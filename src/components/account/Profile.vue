<template>
  <div class="profile">
    <div class="profile__content">
      <img src="@/assets/user.png" />
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
