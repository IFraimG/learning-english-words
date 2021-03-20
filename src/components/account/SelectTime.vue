<template>
  <select v-model="time" @change="setTime" class="modal__select">
    <option v-if="timeEdit == null" :value="-1" selected>Время (none)</option>
    <option v-else :value="-1" selected>{{ timeEdit }}</option>
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
