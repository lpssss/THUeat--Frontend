<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
const columns = [
  {
    name: "attributeName",
    required: true,
    label: "档口基本信息",
    align: "left",
    field: (row) => row.attributeName,
  },
  {
    name: "attribute",
    align: "center",
    label: "属性",
    field: "attribute",
  },
];

export default {
  name: "StallDetailsTable",
  props: {
    // rows的部分需要从api获取的数据整理
    rows: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      columns,
    };
  },
};
</script>

<style scoped></style>
