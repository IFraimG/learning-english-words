<template>
  <div class="profile">
    <div class="profile__content">
      <img src="@/assets/user.png" />
      <h2>{{ profile.login }}</h2>
      <p>{{ profile.email }}</p>
      <button class="profile__run" @click="$emit('setModal', { isModal: true })">
        Добавить новые слова
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  emits: ["setModal"],
  props: {
    profile: Object
  }
};
</script>

<style></style>
