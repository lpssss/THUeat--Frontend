<template>
  <div class="q-pa-md">
    <q-radio v-model="newTimeType" val="standard" label="标准" />
    <q-radio v-model="newTimeType" val="custom" label="自定义" />
    <template v-if="newTimeType === 'standard'">
      <br />
      <q-checkbox v-model="breakfast" label="早餐" />
      <TimePicker
        :lower-limit-time="
          STANDARD_OPERATION_TIME_OPTIONS['breakfast'].lowerLimitTime
        "
        :upper-limit-time="
          STANDARD_OPERATION_TIME_OPTIONS['breakfast'].upperLimitTime
        "
        :enable="breakfast"
        :initial-start-time="
          STANDARD_OPERATION_TIME_OPTIONS['breakfast'].startTime
        "
        :initial-end-time="STANDARD_OPERATION_TIME_OPTIONS['breakfast'].endTime"
        ref="breakfastTime"
      />
      <br />
      <q-checkbox v-model="lunch" label="午餐" />
      <TimePicker
        :lower-limit-time="
          STANDARD_OPERATION_TIME_OPTIONS['lunch'].lowerLimitTime
        "
        :upper-limit-time="
          STANDARD_OPERATION_TIME_OPTIONS['lunch'].upperLimitTime
        "
        :enable="lunch"
        :initial-start-time="STANDARD_OPERATION_TIME_OPTIONS['lunch'].startTime"
        :initial-end-time="STANDARD_OPERATION_TIME_OPTIONS['lunch'].endTime"
        ref="lunchTime"
      />
      <br />
      <q-checkbox v-model="dinner" label="晚餐" />
      <TimePicker
        :lower-limit-time="
          STANDARD_OPERATION_TIME_OPTIONS['dinner'].lowerLimitTime
        "
        :upper-limit-time="
          STANDARD_OPERATION_TIME_OPTIONS['dinner'].upperLimitTime
        "
        :enable="dinner"
        :initial-start-time="
          STANDARD_OPERATION_TIME_OPTIONS['dinner'].startTime
        "
        :initial-end-time="STANDARD_OPERATION_TIME_OPTIONS['dinner'].endTime"
        ref="dinnerTime"
      />
      <br />
      <q-checkbox v-model="supper" label="宵夜" />
      <TimePicker
        :lower-limit-time="
          STANDARD_OPERATION_TIME_OPTIONS['supper'].lowerLimitTime
        "
        :upper-limit-time="
          STANDARD_OPERATION_TIME_OPTIONS['supper'].upperLimitTime
        "
        :enable="supper"
        :initial-start-time="
          STANDARD_OPERATION_TIME_OPTIONS['supper'].startTime
        "
        :initial-end-time="STANDARD_OPERATION_TIME_OPTIONS['supper'].endTime"
        ref="supperTime"
      />
      <br />
    </template>
    <template v-else>
      <div class="q-pa-md">
        <div>自定义时间:</div>
        <TimePicker
          :lower-limit-time="CUSTOM_OPERATION_TIME_OPTIONS.lowerLimitTime"
          :upper-limit-time="CUSTOM_OPERATION_TIME_OPTIONS.upperLimitTime"
          enable
          :initial-start-time="CUSTOM_OPERATION_TIME_OPTIONS.startTime"
          :initial-end-time="CUSTOM_OPERATION_TIME_OPTIONS.endTime"
          ref="customTime"
        />
      </div>
    </template>

    <q-btn color="primary" label="保存修改" @click="prepareSave" />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import TimePicker from "components/TimePicker";
//档口运营时间选项
const STANDARD_OPERATION_TIME_OPTIONS = {
  breakfast: {
    label: "早餐",
    lowerLimitTime: "06:30",
    upperLimitTime: "09:30",
    startTime: "06:30",
    endTime: "09:30",
  },
  lunch: {
    label: "午餐",
    lowerLimitTime: "10:30",
    upperLimitTime: "14:00",
    startTime: "10:30",
    endTime: "14:00",
  },
  dinner: {
    label: "晚餐",
    lowerLimitTime: "16:00",
    upperLimitTime: "21:00",
    startTime: "16:00",
    endTime: "21:00",
  },
  supper: {
    label: "宵夜",
    lowerLimitTime: "19:00",
    upperLimitTime: "23:00",
    startTime: "19:00",
    endTime: "23:00",
  },
};

const CUSTOM_OPERATION_TIME_OPTIONS = {
  label: "自定义",
  lowerLimitTime: "06:30",
  upperLimitTime: "23:00",
  startTime: "06:30",
  endTime: "23:00",
};

export default {
  name: "OperationTimeEditor",
  components: { TimePicker },
  props: {
    myStallDetails: {
      type: Object,
    },
  },
  setup(props, context) {
    //标准或自定义
    const oriTimeType = computed(() => {
      if (props.myStallDetails.stallOperationtime[0].name === "自定义")
        return "custom";
      else return "standard";
    });
    const newTimeType = ref(oriTimeType.value);
    //早餐，午餐，晚餐，宵夜

    const oriTimePeriod = computed(() => {
      function findEng(chineseName) {
        for (let key in STANDARD_OPERATION_TIME_OPTIONS) {
          if (chineseName === STANDARD_OPERATION_TIME_OPTIONS[key].label)
            return key;
        }
        return null; // 这边可能会有问题
      }
      const group = [];
      if (oriTimeType.value === "standard") {
        props.myStallDetails.stallOperationtime.forEach((item) => {
          const engName = findEng(item.name);
          group.push(engName);
          STANDARD_OPERATION_TIME_OPTIONS[engName].startTime = item.startTime;
          STANDARD_OPERATION_TIME_OPTIONS[engName].endTime = item.endTime;
        });
      }
      return group;
    });
    const breakfast = ref(oriTimePeriod.value.includes("breakfast"));
    const lunch = ref(oriTimePeriod.value.includes("lunch"));
    const dinner = ref(oriTimePeriod.value.includes("dinner"));
    const supper = ref(oriTimePeriod.value.includes("supper"));
    const breakfastTime = ref();
    const lunchTime = ref();
    const dinnerTime = ref();
    const supperTime = ref();
    const customTime = ref();

    //做全新的营业时间
    function prepareSave() {
      const newStallOperationTime = [];
      const obj = {
        name: "",
        startTime: "",
        endTime: "",
      };
      if (newTimeType.value === "standard") {
        if (breakfast.value) {
          obj.name = "早餐";
          obj.startTime = breakfastTime.value.startTime;
          obj.endTime = breakfastTime.value.endTime;
          newStallOperationTime.push({ ...obj });
        }
        if (lunch.value) {
          obj.name = "午餐";
          obj.startTime = lunchTime.value.startTime;
          obj.endTime = lunchTime.value.endTime;
          newStallOperationTime.push({ ...obj });
        }
        if (dinner.value) {
          obj.name = "晚餐";
          obj.startTime = dinnerTime.value.startTime;
          obj.endTime = dinnerTime.value.endTime;
          newStallOperationTime.push({ ...obj });
        }
        if (supper.value) {
          obj.name = "宵夜";
          obj.startTime = supperTime.value.startTime;
          obj.endTime = supperTime.value.endTime;
          newStallOperationTime.push({ ...obj });
        }
      } else {
        obj.name = "自定义";
        obj.startTime = customTime.value.startTime;
        obj.endTime = customTime.value.endTime;
        newStallOperationTime.push({ ...obj });
      }
      console.log(newStallOperationTime);
      context.emit("changeTime", newStallOperationTime);
    }

    return {
      newTimeType,
      breakfast,
      lunch,
      dinner,
      supper,
      breakfastTime,
      lunchTime,
      dinnerTime,
      supperTime,
      customTime,
      STANDARD_OPERATION_TIME_OPTIONS,
      CUSTOM_OPERATION_TIME_OPTIONS,
      prepareSave,
    };
  },
};
</script>

<style scoped></style>
