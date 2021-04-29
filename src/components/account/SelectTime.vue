<template>
  <select v-model="time" @change="setTime" class="modal__select">
    <option :value="-1" selected>
      <span v-if="timeEdit == null">Время (none)</span>
      <span v-else>{{ timeEdit }}</span>
    </option>
    <option v-for="(time, index) of timesList" :key="index" :value="index">{{
      time
    }}</option>
  </select>
</template>

<script>
export default {
  name: "SelectTime",
  props: {
    timeEdit: String
  },
  data() {
    return {
      time: -1,
      timesArray: [
        "Present Simple",
        "Present Continious",
        "Present Perfect",
        "Present Perfect Continious",
        "Past Simple",
        "Past Continious",
        "Past Perfect",
        "Past Perfect Continious",
        "Future Simple",
        "Future Perfect",
        "Infinitive",
        "Gerund"
      ]
    };
  },
  mounted() {
    if (this.timeEdit != null) {
      let index = this.timesArray.findIndex(item => item == this.timeEdit);
      if (index != -1) this.time = index;
    }
  },
  computed: {
    timesList() {
      let list = [];
      this.timesArray.forEach(item => {
        if (item != this.timeEdit) list.push(item);
      });
      return list;
    }
  },
  methods: {
    setTime() {
      this.$emit("setTime", this.timesArray[this.time]);
    }
  }
};
</script>

<style></style>
