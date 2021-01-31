<template>
  <div class="not-found__wrapper">
    <div class="not-found">
      <div class="not-found__content">
        <h1>Данной страницы не существует!</h1>
        <img src="@/assets/404.jpg" alt="">
        <p>Совсем скоро вы перенаправитесь на главную страницу {{ time }}</p>
      </div>
    </div>
    <!-- <div class="banner">
      <div class="banner__symbol">
        <h2>?</h2>
      </div>
      <div class="banner__right">
        <h1>ПООС</h1>
        <p>Мы за эффективное обучение !</p>
      </div>
    </div> -->
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

.banner {
  margin: 100px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 600px;
  height: 100px;
  // border: 1px solid #000;
  font-family: "Helvetica";
  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-left: 40px;
    border-left: 1px solid rgba(0, 0, 0, 0.3);
    color: #ffe227;
    h1 {
      font-size: 42px;
    }
    p {
      background-color: #ffe227;
      color: #fff;
      padding: 5px 20px;
      width: 300px;
      font-weight: bold;
    }
  }
  &__symbol {
    width: 200px;
    display: flex;
    justify-content: center;
    color: #fff;
    h2 {
      background-color: #ffe227;
      color: #fff;
      padding: 0 20px;
      font-size: 48px;
    }
  }
}
</style>