<template>
  <div class="spinner">
    <div class="spinner__line"></div>
    <div class="spinner__body"></div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>

<style lang="scss" scoped>
.spinner {
  width: 300px;
  height: 300px;
  background: #000;
  border-radius: 50%;
  animation: spinner 5s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 100px auto;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    background: rgb(22, 139, 52);
    z-index: 3;
  }
  &__body {
    position: absolute;
    z-index: 4;
    background-color: #fff;
    width: 150px;
    height: 150px;
    text-align: center;
    overflow: hidden;
    border-radius: 50%;
  }
  &__line {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      background-color: rgb(22, 139, 52);
    }
  }
}

@keyframes spinner {
  from {
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
