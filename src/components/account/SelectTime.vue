<template>
  <select v-model="time" @change="setTime" class="modal__select">
    <option :value="-1" selected>
      <!-- <span v-if="timeEdit == '' || timeEdit == null || timeEdit == -1">Время (none)</span> -->
      <span>Время (none)</span>
      <!-- <span v-else>{{ timeEdit }}</span> -->
    </option>
    <option v-for="(timeItem, index) of timesList" :key="index" :value="index + 1">
      {{ timeItem }}
    </option>
  </select>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue';

export default {
  name: "SelectTime",
  props: {
    timeEdit: String
  },
  emits: ["setTime"],
  setup(props, { emit }) {
    let time = ref(-1)
    let timesArray = reactive([
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
    ])

    onMounted(() => {
      if (props.timeEdit != null) {
        let index = timesArray.findIndex(item => item == props.timeEdit);
        if (index != -1) time.value = index;
      }
    })

    const setTime = () => {
      if (time.value == -1) emit("setTime", "Time: None")
      else emit("setTime", timesArray[time.value - 1]);
    }

    const timesList = computed(() => {
      let list = [];
      timesArray.forEach(item => list.push(item))
      return list;
    })

    return { time, setTime, timesArray, timesList }
  }
};
</script>
