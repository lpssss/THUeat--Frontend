<template>
  <DishesTable :rows="rows" />
</template>

<script>
import DishesTable from "components/DishesTable";
const rows = [
  {
    dishID: "d1",
    dishName: "string1",
    dishIntro: "string2",
    dishPrice: "string3",
    dishImage: "string4",
    dishLikes: "string5",
    dishAvailableTime: "string6",
    dishStatus: true,
  },
  {
    dishID: "d2",
    dishName: "string1",
    dishIntro: "string2",
    dishPrice: "string3",
    dishImage: "string4",
    dishLikes: "string5",
    dishAvailableTime: "string6",
    dishStatus: false,
  },
  {
    dishID: "d3",
    dishName: "string1",
    dishIntro: "string2",
    dishPrice: "string3",
    dishImage: "string4",
    dishLikes: "string5",
    dishAvailableTime: "string6",
    dishStatus: true,
  },
];
export default {
  name: "DishManagement",
  components: { DishesTable },
  setup() {
    // const API_LINK = "http://localhost:3000/"; // 之后放真正的API
    // const dishData = {};
    // const getDishData = async () => {
    //   try {
    //     const response = await axios.get(API_LINK);
    //     dishData = response.data[0];
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // };
    return {
      rows,
    };
  },
};
</script>

<style scoped></style>
