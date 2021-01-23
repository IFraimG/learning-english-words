<template>
  <div class="not-found__wrapper">
    <div class="not-found">
      <div class="not-found__content">
        <h1>Данной страницы не существует!</h1>
        <img src="@/assets/404.jpg" alt="">
        <p>Совсем скоро вы перенаправитесь на главную страницу {{ time }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      time: 5
    }
  },
  created() {
    setInterval(() => {
      if (this.time > 0) this.time--;
      else this.$router.push("/")
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  &__wrapper {
    height: 100%;
    width: 100%;
  }
  &__content {
    font-family: "Helvetica";
    text-align: center;
    img {
      width: 256px;
      height: 256px;
      object-fit: cover;
    }
    p {
      font-size: 24px;
    }
  }
}
</style>