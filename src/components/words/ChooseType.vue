<template>
  <div class="panel">
    <div class="panel__top">
      <h1>Выберите тип опроса</h1>
    </div>
    <div class="panel__middle">
      <!-- <div
        @click="$emit('setCurrentType', 'englishT')"
        class="panel__left panel__item"
      >
        <h2>
          Определить значение русского слова на английском с вариантами ответов
        </h2>
      </div> -->
      <div class="panel__center panel__item" @click="$emit('setCurrentType', 'englishV')">
        <h2>Написать перевод русского слова на английском вручную</h2>
      </div>
      <div class="panel__right panel__item" @click="$emit('setCurrentType', 'accordion')">
        <h2>Задание "Гормошка"</h2>
      </div>
      <div class="panel__postright panel__item" @click="$emit('setCurrentType', 'sentences')">
        <h2>Составить предложения со словами</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import "./scss/ChooseType.scss"

  export default {
    name: "ChooseType",
  }
</script>
