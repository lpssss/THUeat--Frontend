<template>
  <div class="row items-center">
    <div class="col-auto">
      <q-btn
        :disable="!enable"
        outline
        color="primary"
        :label="startTime"
        @click="chooseStartTime = true"
      />
      <q-popup-proxy
        v-if="chooseStartTime"
        cover
        transition-show="scale"
        transition-hide="scale"
      >
        <q-time v-model="startTime" format24h :options="startTimeOptions">
          <div class="row items-center justify-end">
            <q-btn
              @click="chooseStartTime = false"
              label="关闭"
              color="primary"
              flat
            />
          </div>
        </q-time>
      </q-popup-proxy>
      <span> 到 </span>
      <q-btn
        :disable="!enable"
        outline
        color="primary"
        :label="endTime"
        @click="chooseEndTime = true"
      />
      <q-popup-proxy
        v-if="chooseEndTime"
        cover
        transition-show="scale"
        transition-hide="scale"
      >
        <q-time v-model="endTime" format24h :options="endTimeOptions">
          <div class="row items-center justify-end">
            <q-btn
              @click="chooseEndTime = false"
              label="Close"
              color="primary"
              flat
            />
          </div>
        </q-time>
      </q-popup-proxy>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  name: "TimePicker",
  props: {
    lowerLimitTime: {
      type: String,
    },
    upperLimitTime: {
      type: String,
    },
    initialStartTime: {
      type: String,
    },
    initialEndTime: {
      type: String,
    },
    enable: {
      type: Boolean,
    },
  },
  setup(props) {
    const startTime = ref(props.initialStartTime);
    const endTime = ref(props.initialEndTime);

    const startRange = computed(() => {
      const s = props.lowerLimitTime.split(":");
      const e = props.upperLimitTime.split(":");
      const range = (start, end) =>
        Array.from(Array(end + 1).keys()).slice(start);
      return {
        hourRange: range(parseInt(s[0]), parseInt(e[0])),
        minStart: parseInt(s[1]),
        minEnd: parseInt(e[1]),
      };
    });
    const endRange = computed(() => {
      const s = startTime.value.split(":");
      return {
        hourStart: parseInt(s[0]),
        minStart: parseInt(s[1]),
      };
    });
    // console.log(startRange.value);
    const chooseStartTime = ref(false);
    const chooseEndTime = ref(false);
    function startTimeOptions(hr, min) {
      if (
        hr < startRange.value.hourRange[0] ||
        hr > startRange.value.hourRange[startRange.value.hourRange.length - 1]
      )
        return false;
      if (
        min !== null &&
        hr === startRange.value.hourRange[0] &&
        min < startRange.value.minStart
      )
        return false;
      return !(
        min !== null &&
        hr ===
          startRange.value.hourRange[startRange.value.hourRange.length - 1] &&
        min > startRange.value.minEnd
      );
    }
    function endTimeOptions(hr, min) {
      if (
        hr < endRange.value.hourStart ||
        hr > startRange.value.hourRange[startRange.value.hourRange.length - 1]
      )
        return false;
      if (
        min !== null &&
        hr === endRange.value.hourStart &&
        min < endRange.value.minStart
      )
        return false;
      return !(
        min !== null &&
        hr ===
          startRange.value.hourRange[startRange.value.hourRange.length - 1] &&
        min > startRange.value.minEnd
      );
    }

    return {
      startRange,
      startTime,
      endTime,
      chooseStartTime,
      chooseEndTime,
      startTimeOptions,
      endTimeOptions,
    };
  },
};
</script>

<style scoped></style>
