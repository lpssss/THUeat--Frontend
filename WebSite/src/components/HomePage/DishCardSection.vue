<template>
  <q-card class="my-card-dish">
    <q-img :src="dishImages" :alt="dishName" class="q-card-img" />

    <q-card-section class="q-pb-none">
      <div class="text-h6">
        <router-link :to="{path:'/dish',query:{dishID:dishID}}">{{ dishName }}</router-link>
      </div>
      <div class="text-subtitle2">{{ canteenName }}</div>
      价格：{{dishPrice}}
      <br />
      售卖时间：{{ displayAvailableTime}}
    </q-card-section>

    <q-card-section>
      <div class="ellipsis-2-lines">{{ dishBestComment }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-btn v-if="myDishLike === null" color="primary" size="sm" falt round icon="thumb_up_alt" @click="postDishLikes(dishID)" />
      <q-btn v-if="myDishLike === false" color="primary" size="sm" falt round icon="thumb_up_off_alt" @click="postDishLikes(dishID)" />
      <q-btn v-if="myDishLike === true" color="primary" size="sm" falt round  icon="thumb_up_alt" @click="postDishLikes(dishID)" />
      <span class="q-px-sm text-caption text-grey">{{ dishLikes }}</span>
    </q-card-section>
  </q-card>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import {api} from "boot/axios";
import userAppState from "src/store/userAppState";

export default defineComponent({
  setup(props) {
    const displayAvailableTime=computed(()=>props.dishAvailableTime.join(', '))
    return {
      displayAvailableTime,
      isDishLike: ref(false),
    };
  },
  name: "DishCardSection",
  props: {
    dishID: {
      type: Number,
      required: true
    },
    dishName: {
      type: String,
      required: true
    },

    canteenName: {
      type: String,
      default: ""
    },

    myDishLike: {
      type: Boolean,
      require: true
    },

    dishLikes: {
      type: Number,
      default: 5
    },

    dishPrice: {
      type: String,
      default: "0"
    },
    dishAvailableTime: {
      type: Array
    },
    dishBestComment: {
      type: String,
      default: "No comment."
    },

    dishImages: {
      type: String,
      default: "#"
    }
  },
  methods: {
    postDishLikes(ID) {
      let API_LINK = `dishes/${ID}`;
      // console.log(dishID);

      //loginstatus相关
      const { getToken } = userAppState();
      const loginStatus = computed(() => {
        const token = getToken().value;
        return token !== null;
      });
      if (!loginStatus.value) {
        this.$router.push("/login");
      } else if (this.myDishLike === false) {
        //点赞
        api.post(API_LINK).then(res => {
          if (res.data.code === 200) {
            this.$emit("likeChange");
            // console.log("successfully thumb up");
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              timeout: 500,
              message: "点赞成功",
            });
          } else {
            // console.log("error");
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "error",
              timeout: 1000,
              message: "点赞失败，请刷新重试",
            });
          }
        });
      } else {
        //取消点赞
        api.delete(API_LINK).then(res => {
          if (res.data.code === 200) {
            this.$emit("likeChange");
            // console.log("successfully delete thumb up");
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              timeout: 500,
              message: "取消点赞成功",
            });
          } else {
            // console.log("error");
            this.$q.notify({
              color: "red-4",
              textColor: "white",
              icon: "error",
              timeout: 1000,
              message: "取消点赞失败，请刷新重试",
            });
          }
        });
      }
    },
  }
});
</script>

<style>
</style>
