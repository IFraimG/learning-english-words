<template>
  <div class="not-found__wrapper">
    <div class="not-found">
      <div class="not-found__content">
        <h1>Данной страницы не существует!</h1>
        <img src="@/assets/404.webp" alt="" />
        <p>Совсем скоро вы перенаправитесь на главную страницу {{ time.value }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const Component = defineComponent({
  name: "NotFound",
  setup() {
    const router = useRouter()
    let time = reactive({ value: 5 })

    onMounted(() => {
      setInterval(() => {
        if (time.value > 0) time.value--;
        else router.push("/");
      }, 1000);
    })
    return { time }
  }
})

export default Component;
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
