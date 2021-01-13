<template>
  <div class="panel">
    <div class="panel__top">
      <h1>Выберите тип опроса</h1>
    </div>
    <div class="panel__middle">
      <div @click="$emit('setCurrentType', 'englishT')" class="panel__left panel__item">
        <h2>Определить значение русского слова на английском с вариантами ответов</h2>
      </div>
      <div @click="$emit('setCurrentType', 'englishV')" class="panel__center panel__item">
        <h2>Написать перевод русского слова на английском вручную</h2>
      </div>
      <div @click="$emit('setCurrentType', 'russianV')" class="panel__right panel__item">
        <h2>Написать перевод английского слова на русском вручную</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChooseType"
}
</script>

<style lang="scss" scoped>
.panel {
  margin: 50px 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  font-family: "Helvetica";
  &__top {
    margin-bottom: 50px;
    h1 {
      text-align: center;
    }
  }
  &__middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 50px;
  }
  &__item {
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    text-align: center;
    line-height: 36px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    padding: 10px;
    min-width: 300px;
    min-height: 300px;
    max-width: 300px;
    max-height: 300px;
    color: #fff;
    transition: 0.3s ease-in-out;
    @media (max-width: 369px) {
      min-width: 200px;
      min-height: 200px;
      max-width: 200px;
      max-height: 200px;
      font-size: 14px;
      line-height: 30px;
      padding: 20px;
    }
  }
  &__left {
    background-color: #f05454;
    &:hover {
      background-color: #a73d3d;
    }
  }
  &__center {
    background-color: #222831;
    &:hover {
      background-color: #424e5f;
    }
  }
  &__right {
    background-color: #30475e;
    &:hover {
      background-color: #4d6e91;
    }
  }
}
</style>