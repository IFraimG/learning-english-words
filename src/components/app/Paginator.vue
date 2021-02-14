<template>
  <div class="paginator">
    <span @click="previousPage" class="paginator__arrow">
      <img src="@/assets/arrow-left.png" alt="назад" />
    </span>
    <div v-for="(page, index) of list" :key="index">
      <span :class="activeElement == index ? 'paginator__active' + ' paginator__element' : 'paginator__element'" @click="editPage(index)">
        {{ index + 1 }}
      </span>
    </div>
    <span @click="nextPage" class="paginator__arrow">
      <img src="@/assets/arrow-right.png" alt="вперед" />
    </span>
  </div>
</template>

<script>
export default {
  name: "Paginator",
  props: {
    list: Number,
    activeElement: Number
  },
  methods: {
    previousPage() {
      this.$emit("previousPage")
    },
    editPage(num) {
      this.$emit("editPage", num)
    },
    nextPage() {
      this.$emit("nextPage")
    }
  }
};
</script>

<style lang="scss" scoped>
.paginator {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px 10px;
  margin: 20px;
  margin-top: 30px;
  font-family: 'Montserrat', "Helvetica";
  &__arrow {
    padding: 0 20px;
    vertical-align: middle;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }
  }
  &__element {
    padding: 10px 20px;
    cursor: pointer;
    transition: .2s ease-in-out;
    color: #fff;
    background-color: #222831;
    border: 1px solid rgba(0, 0, 0, 0.3);
    font-weight: bold;
    &:hover {
      background: #dddddd;
      color: #000;
    }
  }
  &__active {
    cursor: pointer;
    background: #dddddd !important;
    color: #000 !important;
    &:hover {
      background-color: #222831 !important;
      color: #fff !important;
    }
  }
}
</style>